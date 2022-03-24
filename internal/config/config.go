package config

import (
	"github.com/sergeyhartmann/mockchamp/internal/logger"
	"github.com/sergeyhartmann/mockchamp/internal/server"
	"go.uber.org/config"
	"go.uber.org/fx"
)

type Config struct {
	fx.Out

	Logger logger.Config
	Server server.Config
}

func NewYAMLConfig(filename string) (Config, error) {
	yaml, err := config.NewYAML(config.File(filename))
	if err != nil {
		return Config{}, err
	}

	config := Config{}
	if err := yaml.Get("").Populate(&config); err != nil {
		return Config{}, err
	}

	return config, nil
}
