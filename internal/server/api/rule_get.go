package api

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
)

func RuleGetHandler(ruleCollection *rule.Collection) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		mockingRule, found := ruleCollection.Get(params.ByName("id"))
		if !found {
			EmptyResponseNotFound(w)
			return
		}

		JsonResponseOK(w, mockingRule)
	}
}
