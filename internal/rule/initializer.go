package rule

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"strings"

	"go.uber.org/zap"
)

type Initializer struct {
	collection *Collection
	logger     *zap.Logger
}

func NewInitializer(collection *Collection, logger *zap.Logger) *Initializer {
	return &Initializer{
		collection: collection,
		logger:     logger,
	}
}

func (i Initializer) Init(dirname string) {
	if _, err := os.Stat(dirname); os.IsNotExist(err) {
		i.logger.Info("directory is not exist, rules not initialized",
			zap.String("dirname", dirname),
		)
		return
	}

	rules := i.parseFromDir(dirname)
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

	i.logger.Info("parse rules from directory is finished", zap.String("dirname", dirname))
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
