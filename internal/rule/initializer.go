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

func (i Initializer) parseFromDir(dirname string) []MockingRule {
	entries, err := ioutil.ReadDir(dirname)
	if err != nil {
		i.logger.Error("error reading directory",
			zap.String("dirname", dirname),
		)
		return nil
	}

	mockingRules := make([]MockingRule, 0)
	for _, entry := range entries {
		entryName := path.Join(dirname, entry.Name())

		if entry.IsDir() {
			mockingRules = append(mockingRules, i.parseFromDir(entryName)...)
			continue
		}

		if strings.HasSuffix(entryName, ".json") {
			mockingRules = append(mockingRules, i.parseFromFile(entryName)...)
		}
	}

	return mockingRules
}

func (i Initializer) parseFromFile(filename string) []MockingRule {
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		i.logger.Error("error reading file",
			zap.String("filename", filename),
		)
		return nil
	}

	rules := make([]MockingRule, 0)
	if err := json.Unmarshal(b, &rules); err == nil { // parse as array of objects
		return rules
	}

	rule := MockingRule{}
	if err := json.Unmarshal(b, &rule); err == nil { // parse as single object
		return []MockingRule{rule}
	}

	i.logger.Error("error parsing rules from file",
		zap.String("filename", filename),
	)

	return nil
}
