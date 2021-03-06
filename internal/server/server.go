package server

import (
	"context"
	"fmt"
	"net/http"

	"github.com/sergeyhartmann/mockchamp/internal/env"

	"github.com/julienschmidt/httprouter"
	"github.com/sergeyhartmann/mockchamp/internal/rlog"
	"github.com/sergeyhartmann/mockchamp/internal/rule"
	"github.com/sergeyhartmann/mockchamp/internal/server/api"
	"github.com/sergeyhartmann/mockchamp/internal/server/stub"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type Config struct {
	Address   string `yaml:"address"`
	PublicDir string `yaml:"public_dir"`
}

type Server struct {
	server *http.Server
	logger *zap.Logger
}

func NewServer(
	config Config,
	env *env.EnvironmentVariables,
	ruleCollection *rule.Collection,
	ruleMatcher *rule.Matcher,
	recorder *rlog.Recorder,
	logger *zap.Logger,
) (*Server, error) {
	router := httprouter.New()

	// internal API routes
	router.GET("/__api/log", api.LogGetHandler(recorder))
	router.DELETE("/__api/rule/:id", api.RuleDeleteHandler(ruleCollection))
	router.GET("/__api/rule/:id", api.RuleGetHandler(ruleCollection))
	router.PATCH("/__api/rule/:id", api.RuleEditHandler(ruleCollection))
	router.POST("/__api/rule", api.RuleCreateHandler(ruleCollection))
	router.GET("/__api/rules", api.RulesGetHandler(ruleCollection))
	router.GET("/__api/tags", api.TagsGetHandler(ruleCollection))

	// static files for web interface
	router.ServeFiles("/__ui/*filepath", http.Dir(config.PublicDir))

	// main handler for stub server
	handle, err := stub.Handler(env, ruleMatcher, recorder)
	if err != nil {
		return nil, err
	}

	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handle(w, r)
		logger.Info(fmt.Sprintf("%s %s", r.Method, r.RequestURI))
	})

	return &Server{
		server: &http.Server{
			Addr:    config.Address,
			Handler: router,
		},
		logger: logger,
	}, nil
}

func (s Server) Run(lc fx.Lifecycle) {
	lc.Append(fx.Hook{
		OnStart: s.onStart,
		OnStop:  s.onStop,
	})
}

func (s Server) onStart(_ context.Context) error {
	go func() {
		s.logger.Info("starting http server", zap.String("address", s.server.Addr))

		if err := s.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			s.logger.Fatal("error while starting http server", zap.Error(err))
		}
	}()

	return nil
}

func (s Server) onStop(ctx context.Context) error {
	s.logger.Info("stopping http server")
	return s.server.Shutdown(ctx)
}
