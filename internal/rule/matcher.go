package rule

import "net/http"

type Matcher struct {
	collection *Collection
}

func NewMatcher(collection *Collection) *Matcher {
	return &Matcher{collection}
}

func (m Matcher) Match(r *http.Request) []MockingRule {
	var (
		method = r.Method
		path   = r.RequestURI
	)

	if len(method) == 0 {
		method = http.MethodGet
	}

	matched := make([]MockingRule, 0)
	for _, rule := range m.collection.GetAll() {
		if rule.Request.Match(method, path) {
			matched = append(matched, rule)
		}
	}

	return matched
}
