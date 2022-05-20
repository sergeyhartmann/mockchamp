package stub

import (
	"net/http"
	"time"

	"github.com/sergeyhartmann/mockchamp/internal/rlog"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
)

func Handler(ruleMatcher *rule.Matcher, recorder *rlog.Recorder) (http.HandlerFunc, error) {
	env := parseEnv()

	proxy, err := newProxy(env.ProxyHost)
	if err != nil {
		return nil, err
	}

	return func(w http.ResponseWriter, r *http.Request) {
		logEntry := rlog.CreateEntry(r)

		matchedRules := ruleMatcher.Match(r) // todo sort by priority

		if len(matchedRules) == 0 && proxy.enabled {
			logEntry.IsProxy = true
			recorder.AddEntry(logEntry)

			proxy.ServeHTTP(w, r)

			return
		}

		if len(matchedRules) == 0 {
			logEntry.Response.Status = env.ResponseStatusCode
			logEntry.Response.Body = env.ResponseMessage()
			recorder.AddEntry(logEntry)

			w.WriteHeader(env.ResponseStatusCode)
			_, _ = w.Write([]byte(env.ResponseMessage()))

			return
		}

		logEntry.FillResponseFromMatchedRules(matchedRules)
		recorder.AddEntry(logEntry)

		sendResponse(w, matchedRules[0])
	}, nil
}

func sendResponse(w http.ResponseWriter, rule rule.Rule) {
	if rule.Response.DelayedBy > 0 {
		time.Sleep(time.Duration(rule.Response.DelayedBy) * time.Millisecond)
	}

	for key, val := range rule.Response.Headers {
		w.Header().Set(key, val)
	}

	w.WriteHeader(rule.Response.HttpStatus)

	_, _ = w.Write([]byte(rule.Response.Body))
}
