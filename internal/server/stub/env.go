package stub

import (
	"net/http"
	"os"
	"strconv"
)

const defaultResponseStatus = http.StatusOK

type env struct {
	ProxyHost          string
	ResponseStatusCode int
}

func parseEnv() env {
	responseStatusCode := defaultResponseStatus
	if s := os.Getenv("RESPONSE_STATUS_CODE"); len(s) > 0 {
		if statusCode, err := strconv.Atoi(s); err == nil {
			responseStatusCode = statusCode
		}
	}

	return env{
		ProxyHost:          os.Getenv("PROXY_HOST"),
		ResponseStatusCode: responseStatusCode,
	}
}

func (e env) ResponseMessage() string {
	if e.ResponseStatusCode != defaultResponseStatus {
		return ""
	}

	return "Hey ya! Great to see you here. Btw, nothing is configured for this request path. " +
		"Create a rule and start building a mock API."
}
