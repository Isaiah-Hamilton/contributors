package handlers

import (
	"errors"
	"testing"

	"github.com/isaiah-hamilton/contributors/backend/utils"
	"github.com/stretchr/testify/assert"
)

func TestGetContributors(t *testing.T) {
	tests := []struct {
		description string
		url         string
		statusCode  int
		error       error
	}{
		{
			description: "test successful response",
			url:         "https://api.github.com/repos/isaiah-hamilton/isaiah-hamilton/contributors",
			statusCode:  200,
		},
		{
			description: "test error response",
			url:         "https://api.github.com/repos/null/null/contributors",
			statusCode:  404,
			error:       errors.New("received status code: 404 Not Found"),
		},
	}

	for _, test := range tests {
		// Fetch data with the url
		// from the test case
		var contributors []utils.Contributor
		statusCode, error := getContributors(test.url, &contributors)

		assert.Equalf(t, test.statusCode, statusCode, test.description)

		if error != nil {
			assert.Equalf(t, test.error, error, test.description)
		}
	}
}
