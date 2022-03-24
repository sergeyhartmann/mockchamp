package api

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
)

func RulesGetHandler(ruleCollection *rule.Collection) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		JsonResponseOK(w, ruleCollection.GetAll())
	}
}
