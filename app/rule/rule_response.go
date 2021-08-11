package rule

import validation "github.com/go-ozzo/ozzo-validation"

type Response struct {
	HttpStatus int               `json:"httpStatus"`
	DelayedBy  int               `json:"delayedBy,omitempty"` // ms
	Headers    map[string]string `json:"headers,omitempty"`
	Body       string            `json:"body,omitempty"`
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
