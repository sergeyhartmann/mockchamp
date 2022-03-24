package server

import "go.uber.org/fx"

type Config struct {
	fx.Out

	Api  ApiServerConfig
	Stub StubServerConfig
}
