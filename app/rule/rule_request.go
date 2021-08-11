package rule

import (
	"net/http"
	"strings"

	validation "github.com/go-ozzo/ozzo-validation"
)

const (
	PathConditionExact     PathCondition = "exact"
	PathConditionStartWith PathCondition = "startWith"
	PathConditionContains  PathCondition = "contains"
)

type PathCondition string

type Request struct {
	Method        string        `json:"method"`
	PathCondition PathCondition `json:"pathCondition"`
	Path          string        `json:"path"`
}

func (r Request) Match(method string, path string) bool {
	if r.Method != method {
		return false
	}

	switch r.PathCondition {
	case PathConditionExact:
		return r.Path == path

	case PathConditionStartWith:
		return strings.HasPrefix(path, r.Path)

	case PathConditionContains:
		return strings.Contains(path, r.Path)

	default:
		return false
	}
}

func (r Request) Validate() error {
	return validation.Errors{
		"method": validation.Validate(&r.Method,
			validation.Required,
			validation.In(
				http.MethodGet,
				http.MethodHead,
				http.MethodPost,
				http.MethodPut,
				http.MethodPatch,
				http.MethodDelete,
				http.MethodConnect,
				http.MethodOptions,
				http.MethodTrace,
			),
		),
		"pathCondition": validation.Validate(&r.PathCondition,
			validation.Required,
			validation.In(
				PathConditionExact,
				PathConditionStartWith,
				PathConditionContains,
			),
		),
		"path": validation.Validate(&r.Path,
			validation.Required,
		),
	}.Filter()
}
