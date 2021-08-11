package rule

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRequestMatchExact(t *testing.T) {
	mockingRuleRequest := Request{
		Method:        "GET",
		PathCondition: PathConditionExact,
		Path:          "/",
	}

	assert := assert.New(t)
	assert.True(mockingRuleRequest.Match("GET", "/"))
	assert.False(mockingRuleRequest.Match("GET", "/kokokodah"))
	assert.False(mockingRuleRequest.Match("POST", "/"))
}

func TestRequestMatchStartWith(t *testing.T) {
	mockingRuleRequest := Request{
		Method:        "GET",
		PathCondition: PathConditionStartWith,
		Path:          "/kokokodah",
	}

	assert := assert.New(t)
	assert.True(mockingRuleRequest.Match("GET", "/kokokodah"))
	assert.True(mockingRuleRequest.Match("GET", "/kokokodah123"))
	assert.True(mockingRuleRequest.Match("GET", "/kokokodah/hohoho?n=123"))
	assert.False(mockingRuleRequest.Match("GET", "/"))
	assert.False(mockingRuleRequest.Match("POST", "/kokokodah"))
}

func TestRequestMatchContains(t *testing.T) {
	mockingRuleRequest := Request{
		Method:        "GET",
		PathCondition: PathConditionContains,
		Path:          "kokokodah",
	}

	assert := assert.New(t)
	assert.True(mockingRuleRequest.Match("GET", "/kokokodah"))
	assert.True(mockingRuleRequest.Match("GET", "/kokokodah123"))
	assert.True(mockingRuleRequest.Match("GET", "/brr/hohoho?n=123&m=kokokodah"))
	assert.False(mockingRuleRequest.Match("GET", "/"))
	assert.False(mockingRuleRequest.Match("POST", "/kokokodah"))
}
