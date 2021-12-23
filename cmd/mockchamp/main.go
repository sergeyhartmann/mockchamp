package main

import (
	"flag"

	"github.com/sergeyhartmann/mockchamp/app/rlog"

	"github.com/sergeyhartmann/mockchamp/app/config"
	"github.com/sergeyhartmann/mockchamp/app/logger"
	"github.com/sergeyhartmann/mockchamp/app/rule"
	"github.com/sergeyhartmann/mockchamp/app/server"
	"go.uber.org/fx"
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

			logger.NewZapLogger,
			rlog.NewRecorder,
			rule.NewCollection,
			rule.NewInitializer,
			rule.NewMatcher,
			server.NewApiServer,
			server.NewStubServer,
		),
		fx.Invoke(register),
	)

	if app.Err() != nil {
		panic(app.Err())
	}

	app.Run()
}

func register(
	lc fx.Lifecycle,
	initializer *rule.Initializer,
	apiServer *server.ApiServer,
	stubServer *server.StubServer,
) {
	initializer.Init(*workdir)
	apiServer.Run(lc)
	stubServer.Run(lc)
}