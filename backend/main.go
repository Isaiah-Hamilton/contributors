package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cache"
	"github.com/gofiber/fiber/v3/middleware/compress"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/isaiah-hamilton/contributors/backend/handlers"
)

func main() {
	app := Setup()

	log.Fatal(app.Listen(":3000"))
}

// Setup Setup a fiber app with all of its routes
func Setup() *fiber.App {
	app := fiber.New()

	app.Use(cache.New(), compress.New(), cors.New())

	app.Get("/api/:user/:repo/:option", handlers.API)

	return app
}
