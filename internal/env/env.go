package env

import "github.com/caarlos0/env/v6"

type EnvironmentVariables struct {
	ProxyHost          string `env:"PROXY_HOST"`
	ResponseStatusCode int    `env:"RESPONSE_STATUS_CODE"`
	PersistMode        bool   `env:"PERSIST_MODE"`
}

func NewEnvironmentVariables() (*EnvironmentVariables, error) {
	environmentVariables := EnvironmentVariables{}
	if err := env.Parse(&environmentVariables); err != nil {
		return nil, err
	}

	return &environmentVariables, nil
}
