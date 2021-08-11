package server

import (
	"context"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/app/rlog"
	"github.com/sergeyhartmann/mockchamp/app/rule"
	"github.com/sergeyhartmann/mockchamp/app/server/api"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type ApiServerConfig struct {
	Address   string `yaml:"address"`
	PublicDir string `yaml:"public_dir"`
}

type ApiServer struct {
	server *http.Server
	logger *zap.Logger
}

func NewApiServer(
	config ApiServerConfig,
	ruleCollection *rule.Collection,
	recorder *rlog.Recorder,
	logger *zap.Logger,
) *ApiServer {
	router := httprouter.New()

	router.GET("/api/log", api.LogGetHandler(recorder))
	router.DELETE("/api/rule/:id", api.RuleDeleteHandler(ruleCollection))
	router.GET("/api/rule/:id", api.RuleGetHandler(ruleCollection))
	router.PATCH("/api/rule/:id", api.RuleEditHandler(ruleCollection))
	router.POST("/api/rule", api.RuleCreateHandler(ruleCollection))
	router.GET("/api/rules", api.RulesGetHandler(ruleCollection))

	router.ServeFiles("/ui/*filepath", http.Dir(config.PublicDir))

	return &ApiServer{
		server: &http.Server{
			Addr:    config.Address,
			Handler: router,
		},
		logger: logger,
	}
}

func (s ApiServer) Run(lc fx.Lifecycle) {
	lc.Append(fx.Hook{
		OnStart: s.onStart,
		OnStop:  s.onStop,
	})
}

func (s ApiServer) onStart(_ context.Context) error {
	go func() {
		s.logger.Info("starting http api server", zap.String("address", s.server.Addr))

		if err := s.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			s.logger.Fatal("error while starting http server", zap.Error(err))
		}
	}()

	return nil
}

func (s ApiServer) onStop(ctx context.Context) error {
	s.logger.Info("stopping http api server")
	return s.server.Shutdown(ctx)
}
