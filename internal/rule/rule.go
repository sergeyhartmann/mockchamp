package rule

import (
	validation "github.com/go-ozzo/ozzo-validation"
)

type MockingRule struct {
	Data
	Id string `json:"id"`
}

type Data struct {
	Request  Request  `json:"request"`
	Response Response `json:"response"`
	Tags     []string `json:"tags,omitempty"`
}

func (d Data) Validate() error {
	return validation.Errors{
		"request":  d.Request.Validate(),
		"response": d.Response.Validate(),
	}.Filter()
}
