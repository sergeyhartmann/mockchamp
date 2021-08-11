package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Config struct {
	Level string
}

func NewZapLogger(config Config) (*zap.Logger, error) {
	cfg := zap.NewProductionConfig()
	var lvl zapcore.Level
	err := lvl.UnmarshalText([]byte(config.Level))
	if err != nil {
		return nil, err
	}

	cfg.Level.SetLevel(lvl)
	cfg.DisableStacktrace = true
	cfg.Encoding = "json"
	cfg.OutputPaths = []string{"stdout"}
	cfg.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder

	return cfg.Build()
}
