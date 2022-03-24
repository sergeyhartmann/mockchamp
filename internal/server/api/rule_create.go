package api

import (
	"encoding/json"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
)

func RuleCreateHandler(ruleCollection *rule.Collection) httprouter.Handle {
	parseRequest := func(r *http.Request) (rule.Data, error) {
		data := rule.Data{}
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			return rule.Data{}, err
		}

		return data, nil
	}

	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		data, err := parseRequest(r)
		if err != nil {
			EmptyResponseBadRequest(w)
			return
		}

		if err := data.Validate(); err != nil {
			JsonResponseBadRequest(w, err)
			return
		}

		mockingRule := rule.MockingRule{
			Id:   rule.GenerateId(),
			Data: data,
		}
		ruleCollection.Add(mockingRule)

		JsonResponseOK(w, mockingRule)
	}
}
