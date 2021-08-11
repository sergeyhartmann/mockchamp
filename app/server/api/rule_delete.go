package api

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/app/rule"
)

func RuleDeleteHandler(ruleCollection *rule.Collection) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		ruleCollection.Delete(params.ByName("id"))
		EmptyResponseOK(w)
	}
}
