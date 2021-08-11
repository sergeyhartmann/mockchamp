package api

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/app/rlog"
)

func LogGetHandler(recorder *rlog.Recorder) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		if r.URL.Query().Get("debug") == "true" {
			JsonResponseOK(w, recorder.GetEntries())
			return
		}

		JsonResponseOK(w, recorder.GetEntriesWithoutDebug())
	}
}
