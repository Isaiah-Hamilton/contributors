package handlers

import (
	"bytes"
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/isaiah-hamilton/contributors/backend/render"
	"github.com/isaiah-hamilton/contributors/backend/utils"
)

func API(c fiber.Ctx) error {
	config := utils.GetConfig(c)

	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/contributors?per_page=%d", c.Params("user"), c.Params("repo"), config.Count)

	// Fetch contributors data
	var contributors []utils.Contributor
	if err := utils.GetData(url, &contributors); err != nil {
		return c.Status(500).SendString("Failed to fetch data from GitHub: " + err.Error())
	}

	switch strings.ToLower(c.Params("option")) {
	case "image":
		return image_api(c, contributors, config)
	case "markdown":
		return markdown_api(c, contributors)
	default:
		return c.Status(404).JSON(c.Params("option") + " is not a vaild option. Please provide an option: Image | Markdown")
	}
}

func image_api(c fiber.Ctx, contributors []utils.Contributor, config utils.Config) error {
	// Create a buffer to store svg
	var buf bytes.Buffer

	render.Image(&buf, contributors, config)

	c.Set("Content-Type", "image/svg+xml")

	return c.Send(buf.Bytes())
}

func markdown_api(c fiber.Ctx, contributors []utils.Contributor) error {
	return c.JSON("markdown")
}
