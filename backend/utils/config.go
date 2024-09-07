package utils

import (
	"strconv"

	"github.com/gofiber/fiber/v3"
)

type Config struct {
	AvatarSize   int
	Gap          int
	Border       int
	BorderColor  string
	UsernameSize int
	Columns      int
	Count        int
}

func defaultConfig() Config {
	return Config{
		AvatarSize:   64,
		Gap:          10,
		Border:       0,
		BorderColor:  "#c0c0c0",
		UsernameSize: 0,
		Columns:      10,
		Count:        30,
	}
}

func GetConfig(c fiber.Ctx) Config {
	config := defaultConfig()

	queryStringParams := map[string]*string{
		"border_color": &config.BorderColor,
	}

	for param, field := range queryStringParams {
		if value := c.Query(param); value != "" {
			*field = value
		}
	}

	queryIntParams := map[string]*int{
		"avatar_size":   &config.AvatarSize,
		"gap":           &config.Gap,
		"border":        &config.Border,
		"username_size": &config.UsernameSize,
		"columns":       &config.Columns,
		"count":         &config.Count,
	}

	for param, field := range queryIntParams {
		if value := c.Query(param); value != "" {
			if intValue, err := strconv.Atoi(value); err == nil {
				*field = intValue
			}
		}
	}

	return config
}
