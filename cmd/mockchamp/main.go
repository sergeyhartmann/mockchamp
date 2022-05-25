package main

import (
	"flag"

	"github.com/sergeyhartmann/mockchamp/internal/config"
	"github.com/sergeyhartmann/mockchamp/internal/env"
	"github.com/sergeyhartmann/mockchamp/internal/logger"
	"github.com/sergeyhartmann/mockchamp/internal/rlog"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
	"github.com/sergeyhartmann/mockchamp/internal/server"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

var (
	configFile = flag.String("cfg", "./config.yml", "path to config file")
	workdir    = flag.String("workdir", "./dockerfiles", "working directory (docker volume)")
)

func main() {
	flag.Parse()

	app := fx.New(
		fx.NopLogger,

		fx.Provide(
			func() (config.Config, error) {
				return config.NewYAMLConfig(*configFile)
			},

			func(env *env.EnvironmentVariables, collection *rule.Collection, logger *zap.Logger) *rule.Initializer {
				return rule.NewInitializer(*workdir, env, collection, logger)
			},

			rlog.NewRecorder,
			logger.NewZapLogger,
			rule.NewCollection,
			rule.NewMatcher,
			server.NewServer,
			env.NewEnvironmentVariables,
		),

		fx.Invoke(func(lc fx.Lifecycle, initializer *rule.Initializer, server *server.Server) {
			initializer.Run(lc)
			server.Run(lc)
		}),
	)

	if app.Err() != nil {
		panic(app.Err())
	}

	app.Run()
}
