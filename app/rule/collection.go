package rule

import "sync"

type Collection struct {
	mu    *sync.RWMutex
	rules []MockingRule
}

func NewCollection() *Collection {
	return &Collection{
		mu:    new(sync.RWMutex),
		rules: make([]MockingRule, 0),
	}
}

func (c *Collection) GetAll() []MockingRule {
	c.mu.RLock()
	defer c.mu.RUnlock()

	rules := make([]MockingRule, len(c.rules))
	copy(rules, c.rules)

	return rules
}

func (c *Collection) Get(id string) (MockingRule, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	for _, rule := range c.rules {
		if rule.Id == id {
			return rule, true
		}
	}

	return MockingRule{}, false
}

func (c *Collection) Add(rules ...MockingRule) {
	c.mu.Lock()
	c.rules = append(c.rules, rules...)
	c.mu.Unlock()
}

func (c *Collection) Delete(id string) {
	c.mu.Lock()
	defer c.mu.Unlock()

	rules := make([]MockingRule, 0)
	for _, rule := range c.rules {
		if rule.Id != id {
			rules = append(rules, rule)
		}
	}

	c.rules = rules
}

func (c *Collection) Update(rule MockingRule) {
	c.mu.Lock()
	defer c.mu.Unlock()

	for i := range c.rules {
		if c.rules[i].Id == rule.Id {
			c.rules[i] = rule
			return
		}
	}
}
