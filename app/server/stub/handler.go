package stub

import (
	"net/http"
	"time"

	"github.com/sergeyhartmann/mockchamp/app/rlog"
	"github.com/sergeyhartmann/mockchamp/app/rule"
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
			logEntry.Response.Body = env.ResponseMessage
			recorder.AddEntry(logEntry)

			w.WriteHeader(env.ResponseStatusCode)
			_, _ = w.Write([]byte(env.ResponseMessage))

			return
		}

		logEntry.FillResponseFromMatchedRules(matchedRules)
		recorder.AddEntry(logEntry)

		sendResponse(w, matchedRules[0])
	}, nil
}

func sendResponse(w http.ResponseWriter, mockingRule rule.MockingRule) {
	if mockingRule.Response.DelayedBy > 0 {
		time.Sleep(time.Duration(mockingRule.Response.DelayedBy) * time.Millisecond)
	}

	for key, val := range mockingRule.Response.Headers {
		w.Header().Set(key, val)
	}

	w.WriteHeader(mockingRule.Response.HttpStatus)

	_, _ = w.Write([]byte(mockingRule.Response.Body))
}
