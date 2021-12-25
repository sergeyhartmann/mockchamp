package api

import (
	"net/http"
	"sort"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/app/rule"
)

func TagsGetHandler(ruleCollection *rule.Collection) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		tagsMap := make(map[string]struct{})
		for _, rule := range ruleCollection.GetAll() {
			for _, tag := range rule.Tags {
				tagsMap[tag] = struct{}{}
			}
		}

		tags := make([]string, 0, len(tagsMap))
		for tag, _ := range tagsMap {
			tags = append(tags, tag)
		}

		sort.Strings(tags)

		JsonResponseOK(w, tags)
	}
}
