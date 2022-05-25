[[RU](./README.md)] [[EN](./README_en.md)]

:muscle: MockChamp - open-source software for mock HTTP API. MockChamp is written in Go and distributed as a
[docker container](https://hub.docker.com/r/sergeyhartmann/mockchamp).

## Getting started

```
docker run -p 8181:8181 sergeyhartmann/mockchamp
```

On `localhost:8181` HTTP server will be started. It will process any incoming requests and return fake responses,
depending on the configured rules. You can use a special API or web interface to set up rules.

Reserved HTTP routes:

- http://localhost:8181/__ui - web interface.
- http://localhost:8181/__api - API.

You can initialize MockChamp when starting a container with a set of mock rules from a json files.
To do this, mount `*.json` files (see `dockerfiles/rules.json` example) to workdir `/mockchamp` of docker container.

```
docker run -p 8181:8181 -v $(pwd)/dockerfiles:/mockchamp sergeyhartmann/mockchamp
```

## Environment Variables

```
docker run \
  -p 8181:8181 \
  -v $(pwd)/dockerfiles:/mockchamp \
  -e PROXY_HOST='example.com' \
  -e RESPONSE_STATUS_CODE=404 \
  -e PERSIST_MODE=true \
  sergeyhartmann/mockchamp
```

`PROXY_HOST`

If HTTP server does not match the mock rule for the request, the request will be proxied to the specified host.
If host is not specified, then the server will return response with HTTP Status 200 OK.

`RESPONSE_STATUS_CODE`

If HTTP server does not match the mock rule for the request, it will return a response with the specified HTTP status.

`PERSIST_MODE`

If persistent mode is enabled, then all rules created through the API or web interface will be saved
between docker container restarts.

## Development

1. Clone repository

```
git clone https://github.com/sergeyhartmann/mockchamp
cd mockchamp
```

2. Run `main.go`

```
go run cmd/mockchamp/main.go
```

3. For web interface run React App

```
cd ui
npm install
npm run start
```
