package main

import (
	"bytes"
	"encoding/json"
	"github.com/ajstarks/svgo"
	"github.com/gofiber/fiber/v3"
	"log"
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

func getData(url string, data interface{}) error {
	response, error := http.Get(url)
	if error != nil {
		return error
	}
	defer response.Body.Close()
	return json.NewDecoder(response.Body).Decode(data)
}

func main() {
	// Initialize a new Fiber app
	app := fiber.New()

	// set `/api` as base path
	api := app.Group("/api")

	// Define a route for the GET method on the root path '/'
	api.Get("/:user/:repo", func(c fiber.Ctx) error {
		// Create a buffer to store the generated SVG
		var buf bytes.Buffer

		// Create a new SVG canvas
		canvas := svg.New(&buf)

		// Start the SVG document with a specified width and height
		canvas.Start(100, 100)

		// Draw a red circle with a black border
		canvas.Circle(50, 50, 40, "fill:blue;stroke:black;stroke-width:3")

		// End the SVG document
		canvas.End()

		// Set the Content-Type to image/svg+xml
		c.Set("Content-Type", "image/svg+xml")

		// Send the generated SVG as the response
		return c.Send(buf.Bytes())
	})

	// Start the server on port 3000
	log.Fatal(app.Listen(":3000"))
}
