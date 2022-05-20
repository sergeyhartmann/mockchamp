package rule

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCollection(t *testing.T) {
	assert := assert.New(t)

	collection := NewCollection()

	// add 3 rules
	collection.Add(Rule{Id: "1"}, Rule{Id: "2"}, Rule{Id: "3"})
	rules := collection.GetAll()
	assert.Len(rules, 3)

	// add 1 rule
	collection.Add(Rule{Id: "4"})
	rules = collection.GetAll()
	assert.Len(rules, 4)

	// get last added rule
	rule, found := collection.Get("4")
	assert.True(found)
	assert.Equal("4", rule.Id)

	// update last added rule
	rule.Response.HttpStatus = 400
	collection.Update(rule)
	rule, found = collection.Get("4")
	assert.True(found)
	assert.Equal(400, rule.Response.HttpStatus)

	// remove last added rule
	collection.Delete("4")
	rules = collection.GetAll()
	assert.Len(rules, 3)
}
