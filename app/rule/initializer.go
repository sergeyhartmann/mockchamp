package rule

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path"

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
	rules := i.parseRulesFromFile(dirname)
	for _, rule := range rules {
		if err := rule.Validate(); err != nil {
			continue
		}

		if len(rule.Id) == 0 {
			rule.Id = GenerateId()
		}

		i.collection.Add(rule)
	}

	i.logger.Info("rule collection is initialized",
		zap.Int("added", len(i.collection.GetAll())),
		zap.Int("skipped", len(rules)-len(i.collection.GetAll())),
	)
}

func (i Initializer) parseRulesFromFile(dirname string) []MockingRule {
	filename := path.Join(dirname, "rules.json")

	_, err := os.Stat(filename)
	if os.IsNotExist(err) {
		i.logger.Info("rules.json for initializing was not found",
			zap.String("filename", filename),
		)
		return nil
	}

	b, err := ioutil.ReadFile(filename)
	if err != nil {
		i.logger.Error("error reading rules.json",
			zap.Error(err),
			zap.String("filename", filename),
		)
		return nil
	}

	rules := make([]MockingRule, 0)
	if err := json.Unmarshal(b, &rules); err != nil {
		i.logger.Error("error parsing rules.json",
			zap.Error(err),
			zap.String("filename", filename),
		)
		return nil
	}

	return rules
}
