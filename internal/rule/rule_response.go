package rule

import (
	"encoding/json"

	validation "github.com/go-ozzo/ozzo-validation"
)

type (
	Response struct {
		HttpStatus int
		DelayedBy  int
		Headers    map[string]string
		Body       string
	}

	JSONResponse struct {
		HttpStatus int               `json:"httpStatus"`
		DelayedBy  int               `json:"delayedBy,omitempty"` // ms
		Headers    map[string]string `json:"headers,omitempty"`
		Body       string            `json:"body,omitempty"`
		BodyJson   json.RawMessage   `json:"bodyJson,omitempty"` // only used during initialization
	}
)

func (r Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(&JSONResponse{
		HttpStatus: r.HttpStatus,
		DelayedBy:  r.DelayedBy,
		Headers:    r.Headers,
		Body:       r.Body,
	})
}

func (r *Response) UnmarshalJSON(data []byte) error {
	jr := JSONResponse{}
	if err := json.Unmarshal(data, &jr); err != nil {
		return err
	}

	r.HttpStatus = jr.HttpStatus
	r.DelayedBy = jr.DelayedBy
	r.Headers = jr.Headers
	r.Body = jr.Body

	if len(jr.BodyJson) > 0 {
		b, _ := jr.BodyJson.MarshalJSON()
		r.Body = string(b)
	}

	return nil
}

func (r Response) Validate() error {
	return validation.Errors{
		"httpStatus": validation.Validate(&r.HttpStatus,
			validation.Required,
		),
		"delayedBy": validation.Validate(&r.DelayedBy,
			validation.Min(0),
		),
	}.Filter()
}
