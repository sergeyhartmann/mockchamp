package stub

import (
	"net/http"
	"time"

	"github.com/sergeyhartmann/mockchamp/internal/env"
	"github.com/sergeyhartmann/mockchamp/internal/rlog"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
)

func Handler(
	env *env.EnvironmentVariables,
	ruleMatcher *rule.Matcher,
	recorder *rlog.Recorder,
) (http.HandlerFunc, error) {
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
			statusCode, body := getStatusCodeAndBodyDefault(env)

			logEntry.Response.Status = statusCode
			logEntry.Response.Body = body
			recorder.AddEntry(logEntry)

			sendResponseDefault(w, statusCode, body)

			return
		}

		logEntry.FillResponseFromMatchedRules(matchedRules)
		recorder.AddEntry(logEntry)

		sendResponseByRule(w, matchedRules[0])
	}, nil
}

func getStatusCodeAndBodyDefault(env *env.EnvironmentVariables) (int, string) {
	statusCode := http.StatusOK
	body := "Hey ya! Great to see you here. Btw, nothing is configured for this request path. " +
		"Create a rule and start building a mock API."

	if env.ResponseStatusCode != 0 {
		statusCode = env.ResponseStatusCode
		body = ""
	}

	return statusCode, body
}

func sendResponseDefault(w http.ResponseWriter, statusCode int, body string) {
	w.WriteHeader(statusCode)
	_, _ = w.Write([]byte(body))
}

func sendResponseByRule(w http.ResponseWriter, rule rule.Rule) {
	if rule.Response.DelayedBy > 0 {
		time.Sleep(time.Duration(rule.Response.DelayedBy) * time.Millisecond)
	}

	for key, val := range rule.Response.Headers {
		w.Header().Set(key, val)
	}

	w.WriteHeader(rule.Response.HttpStatus)

	_, _ = w.Write([]byte(rule.Response.Body))
}
