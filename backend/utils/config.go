package utils

import (
	"strconv"

	"github.com/gofiber/fiber/v3"
)

type Config struct {
	AvatarSize int
	Gap        int
	Border     int
	// BorderColor  string
	Columns      int
	UsernameSize int
	Count        int
}

func defaultConfig() Config {
	return Config{
		AvatarSize:   64,
		Gap:          10,
		Border:       0,
		Columns:      10,
		UsernameSize: 0,
		Count:        30,
	}
}

func GetConfig(c fiber.Ctx) Config {
	config := defaultConfig()

	queryParams := map[string]*int{
		"avatar_size":   &config.AvatarSize,
		"gap":           &config.Gap,
		"border":        &config.Border,
		"username_size": &config.UsernameSize,
		"count":         &config.Count,
	}

	for param, field := range queryParams {
		if value := c.Query(param); value != "" {
			if intValue, err := strconv.Atoi(value); err == nil {
				*field = intValue
			}
		}
	}

	return config
}
