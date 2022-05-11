[[RU](./README.md)] [[EN](./README_en.md)]

MockChamp - open-source software for mock HTTP API. MockChamp is written in Go and distributed as a
[docker container](https://hub.docker.com/r/sergeyhartmann/mockchamp).

## Getting started

```
docker run -p 8181:8181 sergeyhartmann/mockchamp
```

On `localhost:8181` HTTP Stub server will be started. It will process any incoming requests and return fake responses,
depending on the configured rules. You can use a special internal API or web interface to set up rules.

Reserved HTTP routes on Stub server:

- http://localhost:8181/__ui - web interface.
- http://localhost:8181/__api - internal API.

You can initialize MockChamp when starting a Docker container with a set of mock rules from a json files.
To do this, mount `*.json` files (see `dockerfiles/rules.json` example) in the `/mockchamp` folder of your Docker container.

```
docker run -p 8181:8181 -v $(pwd)/dockerfiles:/mockchamp sergeyhartmann/mockchamp
```

## Environment Variables

```
docker run \
  -p 8181:8181 \
  -e PROXY_HOST='example.com' \
  sergeyhartmann/mockchamp
```

`PROXY_HOST`

If the Stub server does not match the mock rule for the request, the request will be proxied to the specified host.
If host is not specified, then the Stub server will return response with HTTP Status 200 OK.

`RESPONSE_STATUS_CODE`

If the Stub server does not match the mock rule for the request, it will return a response with the specified HTTP status.

## Development

1. Clone repository

```
git clone https://github.com/sergeyhartmann/mockchamp
cd mockchamp
```

2. Run `main.go` (Stub server + internal API for web interface)

```
go run cmd/mockchamp/main.go
```

3. For web interface run React App

```
cd ui
npm install
npm run start
```
