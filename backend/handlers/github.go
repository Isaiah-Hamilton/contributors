package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
)

func GetData(url string, data interface{}) (int, error) {
	response, err := http.Get(url)

	// if error return status code 500 and error message
	if err != nil {
		return 500, err
	}

	defer response.Body.Close()

	// if status code != 200 reutnr status cde and error message
	if response.StatusCode != http.StatusOK {
		return response.StatusCode, errors.New("received status code: " + response.Status)
	}

	// if failed to decode response return status code 500 and error message
	err = json.NewDecoder(response.Body).Decode(data)
	if err != nil {
		return 500, err
	}

	// return all data
	return response.StatusCode, nil
}
