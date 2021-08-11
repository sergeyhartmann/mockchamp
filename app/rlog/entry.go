package rlog

import (
	"io/ioutil"
	"net/http"

	"github.com/sergeyhartmann/mockchamp/app/rule"
)

type EntryWithoutDebug struct {
	Request struct {
		Method    string            `json:"method"`
		Url       string            `json:"url"`
		UserAgent string            `json:"userAgent"`
		Headers   map[string]string `json:"headers,omitempty"`
		Body      string            `json:"body,omitempty"`
	} `json:"request"`

	Response struct {
		Status  int               `json:"status,omitempty"`
		Headers map[string]string `json:"headers,omitempty"`
		Body    string            `json:"body,omitempty"`
	} `json:"response,omitempty"`

	IsProxy bool `json:"is_proxy,omitempty"`
}

type Entry struct {
	EntryWithoutDebug
	Debug struct {
		MatchedRules []rule.MockingRule `json:"matchedRules"`
	} `json:"debug"`
}

func CreateEntry(r *http.Request) Entry {
	var entry Entry
	entry.fillRequest(r)

	return entry
}

func (e *Entry) FillResponseFromMatchedRules(matchedRules []rule.MockingRule) {
	if len(matchedRules) > 0 {
		e.fillResponse(matchedRules[0])
		e.Debug.MatchedRules = matchedRules
	}
}

func (e *Entry) fillRequest(r *http.Request) {
	headers := make(map[string]string)
	for key, values := range r.Header {
		headers[key] = values[0]
	}

	bodyBytes, _ := ioutil.ReadAll(r.Body)

	e.Request.Method = r.Method
	e.Request.Url = r.RequestURI
	e.Request.UserAgent = r.UserAgent()
	e.Request.Headers = headers
	e.Request.Body = string(bodyBytes)
}

func (e *Entry) fillResponse(mockingRule rule.MockingRule) {
	e.Response.Status = mockingRule.Response.HttpStatus
	e.Response.Headers = mockingRule.Response.Headers
	e.Response.Body = mockingRule.Response.Body
}
