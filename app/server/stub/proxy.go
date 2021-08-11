package stub

import (
	"net/http/httputil"
	"net/url"
)

type proxy struct {
	enabled bool
	*httputil.ReverseProxy
}

func newProxy(host string) (*proxy, error) {
	if len(host) == 0 {
		return new(proxy), nil
	}

	url, err := url.Parse(host)
	if err != nil {
		return nil, err
	}

	return &proxy{
		enabled:      true,
		ReverseProxy: httputil.NewSingleHostReverseProxy(url),
	}, nil
}
