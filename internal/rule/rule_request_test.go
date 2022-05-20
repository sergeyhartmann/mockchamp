package rule

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRequestMatchExact(t *testing.T) {
	ruleRequest := Request{
		Method:        "GET",
		PathCondition: PathConditionExact,
		Path:          "/",
	}

	assert := assert.New(t)
	assert.True(ruleRequest.Match("GET", "/"))
	assert.False(ruleRequest.Match("GET", "/kokokodah"))
	assert.False(ruleRequest.Match("POST", "/"))
}

func TestRequestMatchStartWith(t *testing.T) {
	ruleRequest := Request{
		Method:        "GET",
		PathCondition: PathConditionStartWith,
		Path:          "/kokokodah",
	}

	assert := assert.New(t)
	assert.True(ruleRequest.Match("GET", "/kokokodah"))
	assert.True(ruleRequest.Match("GET", "/kokokodah123"))
	assert.True(ruleRequest.Match("GET", "/kokokodah/hohoho?n=123"))
	assert.False(ruleRequest.Match("GET", "/"))
	assert.False(ruleRequest.Match("POST", "/kokokodah"))
}

func TestRequestMatchContains(t *testing.T) {
	ruleRequest := Request{
		Method:        "GET",
		PathCondition: PathConditionContains,
		Path:          "kokokodah",
	}

	assert := assert.New(t)
	assert.True(ruleRequest.Match("GET", "/kokokodah"))
	assert.True(ruleRequest.Match("GET", "/kokokodah123"))
	assert.True(ruleRequest.Match("GET", "/brr/hohoho?n=123&m=kokokodah"))
	assert.False(ruleRequest.Match("GET", "/"))
	assert.False(ruleRequest.Match("POST", "/kokokodah"))
}
