package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/isaiah-hamilton/contributors/backend/handlers"
)

func main() {
	app := fiber.New()

	api := app.Group("/api")

	api.Get("/:user/:repo/:option", handlers.API)

	log.Fatal(app.Listen(":3000"))
}
