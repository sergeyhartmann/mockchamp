package api

import (
	"encoding/json"
	"net/http"
)

func JsonResponse(w http.ResponseWriter, data interface{}, statusCode int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	w.WriteHeader(statusCode)

	b, _ := json.Marshal(data)
	_, _ = w.Write(b)
}

func JsonResponseOK(w http.ResponseWriter, data interface{}) {
	JsonResponse(w, data, http.StatusOK)
}

func JsonResponseBadRequest(w http.ResponseWriter, data interface{}) {
	JsonResponse(w, data, http.StatusBadRequest)
}

func EmptyResponseOK(w http.ResponseWriter) {
	w.WriteHeader(http.StatusOK)
}

func EmptyResponseNotFound(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotFound)
}

func EmptyResponseBadRequest(w http.ResponseWriter) {
	w.WriteHeader(http.StatusBadRequest)
}

func EmptyResponseInternalServerError(w http.ResponseWriter) {
	w.WriteHeader(http.StatusInternalServerError)
}

func EmptyResponseNotImplemented(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotImplemented)
}
