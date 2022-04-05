MockChamp - a tool for mock HTTP API. This is a regular [docker container](https://hub.docker.com/r/sergeyhartmann/mockchamp)
you can add to your environment.

## Getting Started

```
docker run -d -p 8181:8181 sergeyhartmann/mockchamp
```

On `localhost:8181` HTTP stub server will be started. It will process any incoming requests and return fake responses,
depending on the configured rules. You can use a special internal API or web interface to set up rules.

Reserved HTTP routes on Stub server:

- http://localhost:8181/__ui - web interface.
- http://localhost:8181/__api - internal API.

You can initialize MockChamp when starting a docker container with a set of mock rules from a json files.
To do this, mount `*.json` files (see `dockerfiles/rules.json` example) in the `/mockchamp` folder of your docker container.

```
docker run -d -p 8181:8181 -v $(pwd)/dockerfiles:/mockchamp sergeyhartmann/mockchamp
```

## Environment Variables

```
docker run -d \
  -p 8181:8181 \
  -e PROXY_HOST='google.com' \
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
