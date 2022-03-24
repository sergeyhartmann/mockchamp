package server

import (
	"context"
	"net/http"

	"github.com/sergeyhartmann/mockchamp/internal/rlog"

	"github.com/sergeyhartmann/mockchamp/internal/rule"
	"github.com/sergeyhartmann/mockchamp/internal/server/stub"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type StubServerConfig struct {
	Address string
}

type StubServer struct {
	server *http.Server
	logger *zap.Logger
}

func NewStubServer(
	config StubServerConfig,
	ruleMatcher *rule.Matcher,
	recorder *rlog.Recorder,
	logger *zap.Logger,
) (*StubServer, error) {
	handler, err := stub.Handler(ruleMatcher, recorder)
	if err != nil {
		return nil, err
	}

	return &StubServer{
		server: &http.Server{
			Addr:    config.Address,
			Handler: handler,
		},
		logger: logger,
	}, nil
}

func (s StubServer) Run(lc fx.Lifecycle) {
	lc.Append(fx.Hook{
		OnStart: s.onStart,
		OnStop:  s.onStop,
	})
}

func (s StubServer) onStart(_ context.Context) error {
	go func() {
		s.logger.Info("starting http stub server", zap.String("address", s.server.Addr))

		if err := s.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			s.logger.Fatal("error while starting http server", zap.Error(err))
		}
	}()

	return nil
}

func (s StubServer) onStop(ctx context.Context) error {
	s.logger.Info("stopping http stub server")
	return s.server.Shutdown(ctx)
}
