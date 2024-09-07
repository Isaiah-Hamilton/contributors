package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/isaiah-hamilton/contributors/backend/handlers"
)

func main() {
	// Initialize a new Fiber app
	app := fiber.New()

	// Set `/api` as base path
	api := app.Group("/api")

	api.Get("/:user/:repo/:option", handlers.API)

	// Start the server on port 3000
	log.Fatal(app.Listen(":3000"))
}
