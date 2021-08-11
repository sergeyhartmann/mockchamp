package stub

import (
	"net/http"
	"os"
	"strconv"
)

type env struct {
	ProxyHost          string
	ResponseMessage    string
	ResponseStatusCode int
}

func parseEnv() env {
	responseMessage := "Hey ya! Great to see you here. Btw, nothing is configured for this request path. " +
		"Create a rule and start building a mock API."
	if s := os.Getenv("RESPONSE_MESSAGE"); len(s) > 0 {
		responseMessage = s
	}

	responseStatusCode := http.StatusOK
	if s := os.Getenv("RESPONSE_STATUS_CODE"); len(s) > 0 {
		if statusCode, err := strconv.Atoi(s); err == nil {
			responseStatusCode = statusCode
		}
	}

	return env{
		ProxyHost:          os.Getenv("PROXY_HOST"),
		ResponseMessage:    responseMessage,
		ResponseStatusCode: responseStatusCode,
	}
}
