package api

import (
	"encoding/json"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
)

func RuleEditHandler(ruleCollection *rule.Collection) httprouter.Handle {
	parseResponse := func(r *http.Request) (rule.Data, error) {
		data := rule.Data{}
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			return rule.Data{}, err
		}

		return data, nil
	}

	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		mockingRule, found := ruleCollection.Get(params.ByName("id"))
		if !found {
			EmptyResponseNotFound(w)
			return
		}

		data, err := parseResponse(r)
		if err != nil {
			EmptyResponseBadRequest(w)
			return
		}

		if err := data.Validate(); err != nil {
			JsonResponseBadRequest(w, err)
			return
		}

		mockingRule.Data = data
		ruleCollection.Update(mockingRule)

		JsonResponseOK(w, mockingRule)
	}
}
