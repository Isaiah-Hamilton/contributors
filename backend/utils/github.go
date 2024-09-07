package utils

import (
	"encoding/json"
	"net/http"
)

type Contributors struct {
	Contributors []Contributor
}

type Contributor struct {
	Id       int    `json:"id"`
	Username string `json:"login"`
	Avatar   string `json:"avatar_url"`
	Url      string `json:"url"`
}

func GetData(url string, data interface{}) error {
	response, err := http.Get(url)

	if err != nil {
		return err
	}

	defer response.Body.Close()
	return json.NewDecoder(response.Body).Decode(data)
}
