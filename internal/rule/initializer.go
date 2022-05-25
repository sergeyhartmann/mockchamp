package rule

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"strings"

	"github.com/sergeyhartmann/mockchamp/internal/env"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

const dumpFilename = "__dump"

type Initializer struct {
	workdir    string
	env        *env.EnvironmentVariables
	collection *Collection
	logger     *zap.Logger
}

func NewInitializer(
	workdir string,
	env *env.EnvironmentVariables,
	collection *Collection,
	logger *zap.Logger,
) *Initializer {
	return &Initializer{
		workdir:    workdir,
		env:        env,
		collection: collection,
		logger:     logger,
	}
}

func (i Initializer) Run(lc fx.Lifecycle) {
	lc.Append(fx.Hook{
		OnStart: i.onStart,
		OnStop:  i.onStop,
	})
}

func (i Initializer) onStart(_ context.Context) error {
	if !i.isExist(i.workdir) {
		i.logger.Info("directory is not exist, rules not initialized", zap.String("dirname", i.workdir))
		return nil
	}

	dump := path.Join(i.workdir, dumpFilename)
	if i.isExist(dump) && i.env.PersistMode {
		i.addToCollection(i.parseFromFile(dump))
		i.logger.Info("rules successfully restored from dump")
		return nil
	}

	i.addToCollection(i.parseFromDir(i.workdir))
	i.logger.Info("rules initialization complete from *.json files")

	return nil
}

func (i Initializer) onStop(_ context.Context) error {
	if i.env.PersistMode {
		rules := i.collection.GetAll()
		b, _ := json.Marshal(rules)
		return ioutil.WriteFile(path.Join(i.workdir, dumpFilename), b, 0644)
	}

	return nil
}

func (i Initializer) isExist(name string) bool {
	_, err := os.Stat(name)
	return !os.IsNotExist(err)
}

func (i Initializer) parseFromDir(dirname string) []Rule {
	entries, err := ioutil.ReadDir(dirname)
	if err != nil {
		i.logger.Error("error reading directory",
			zap.String("dirname", dirname),
		)
		return nil
	}

	rules := make([]Rule, 0)
	for _, entry := range entries {
		entryName := path.Join(dirname, entry.Name())

		if entry.IsDir() {
			rules = append(rules, i.parseFromDir(entryName)...)
			continue
		}

		if strings.HasSuffix(entryName, ".json") {
			rules = append(rules, i.parseFromFile(entryName)...)
		}
	}

	return rules
}

func (i Initializer) parseFromFile(filename string) []Rule {
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		i.logger.Error("error reading file",
			zap.String("filename", filename),
		)
		return nil
	}

	rules := make([]Rule, 0)
	if err := json.Unmarshal(b, &rules); err == nil { // parse as array of objects
		return rules
	}

	rule := Rule{}
	if err := json.Unmarshal(b, &rule); err == nil { // parse as single object
		return []Rule{rule}
	}

	i.logger.Error("error parsing rules from file",
		zap.String("filename", filename),
	)

	return nil
}

func (i Initializer) addToCollection(rules []Rule) {
	for _, rule := range rules {
		if err := rule.Validate(); err != nil {
			i.logger.Error("rule has wrong data", zap.Error(err))
			continue
		}

		if len(rule.Id) == 0 {
			rule.Id = GenerateId()
		}

		i.collection.Add(rule)
	}
}
