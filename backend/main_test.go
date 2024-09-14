package main

import (
	// "io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAPI(t *testing.T) {
	tests := []struct {
		description string
		route       string
		statusCode  int
	}{
		{
			description: "test non existing route",
			route:       "/i-dont-exist",
			statusCode:  404,
		},
		{
			description: "test valid user and repo path",
			route:       "/api/supabase/supabase/image",
			statusCode:  200,
		},
		{
			description: "test invalid User or repo parameter",
			route:       "/api/invalid_user/invalid_repo/image",
			statusCode:  400,
		},
	}

	app := Setup()

	// Iterate through test single test cases
	for _, test := range tests {
		// Create a new http request with the route
		// from the test case
		req, _ := http.NewRequest(
			"GET",
			test.route,
			nil,
		)

		// Perform the request plain with the app.
		// The -1 disables request latency.
		res, err := app.Test(req, -1)

		// Verify if the status code is as expected
		assert.Equalf(t, test.statusCode, res.StatusCode, test.description)

		// Reading the response body should work everytime, such that
		// the err variable should be nil
		assert.Nilf(t, err, test.description)
	}
}
