package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
)

func main() {
	// Initialize a new Fiber app
	app := fiber.New()

	// set `/api` as base path
	api := app.Group("/api")

	// Define a route for the GET method on the root path '/'
	api.Get("/:user/:repo", func(c fiber.Ctx) error {
		return c.SendString("param: " + c.Params("user"))
	})

	// Start the server on port 3000
	log.Fatal(app.Listen(":3000"))
}
