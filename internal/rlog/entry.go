package rlog

import (
	"io/ioutil"
	"net/http"

	"github.com/sergeyhartmann/mockchamp/internal/rule"
)

type EntryWithoutDebug struct {
	Request struct {
		Method  string            `json:"method"`
		Url     string            `json:"url"`
		Headers map[string]string `json:"headers,omitempty"`
		Body    string            `json:"body,omitempty"`
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
		Rules []rule.Rule `json:"rules"`
	} `json:"debug"`
}

func CreateEntry(r *http.Request) Entry {
	var entry Entry
	entry.fillRequest(r)

	return entry
}

func (e *Entry) FillResponseFromMatchedRules(matchedRules []rule.Rule) {
	if len(matchedRules) > 0 {
		e.fillResponse(matchedRules[0])
		e.Debug.Rules = matchedRules
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
	e.Request.Headers = headers
	e.Request.Body = string(bodyBytes)
}

func (e *Entry) fillResponse(rule rule.Rule) {
	e.Response.Status = rule.Response.HttpStatus
	e.Response.Headers = rule.Response.Headers
	e.Response.Body = rule.Response.Body
}
