[[RU](./README.md)] [[EN](./README_en.md)]

MockChamp - open-source инструмент для мока HTTP API. MockChamp написан на Go и распространяется как 
[docker container](https://hub.docker.com/r/sergeyhartmann/mockchamp).

## Начало работы c MockChamp

```
docker run -p 8181:8181 sergeyhartmann/mockchamp
```

На `localhost:8181` будет запущен HTTP Stub сервер. Он принимает входящие запросы и отдает фейковый ответ,
в зависимости от настроенных правил. Вы можете создать их используя специальное API или веб интерфейс.

Зарезервированные HTTP роуты у Stub сервера:

- http://localhost:8181/__ui - веб интерфейс.
- http://localhost:8181/__api - внутренее API.

Вы можете инициализировать MockChamp набором правил из json файлов. Для этого, при страте docker container,
монтируйте свои `*.json` файлы (для примера см. `dockerfiles/rules.json`) в папку `/mockchamp` внутри docker container.

```
docker run -p 8181:8181 -v $(pwd)/dockerfiles:/mockchamp sergeyhartmann/mockchamp
```

## Переменные окружения

```
docker run \
  -p 8181:8181 \
  -e PROXY_HOST='example.com' \
  sergeyhartmann/mockchamp
```

`PROXY_HOST`

Если у Stub сервера нет подходящего правила для входящего запроса, то он будет проксирован на указанный хост.
В случае если прокси хост не указан, Stub сервер вернет HTTP Status код 200 OK.

`RESPONSE_STATUS_CODE`

Если у Stub сервера нет подходящего правила для входящего запроса, то сервер вернет указанный HTTP Status код.

## Разработка

1. Склонируйте репозиторий

```
git clone https://github.com/sergeyhartmann/mockchamp
cd mockchamp
```

2. Запустите `main.go` (Stub сервер + внутренне API для веб интерфейса)

```
go run cmd/mockchamp/main.go
```

3. Для веб интерфейса запустите React App

```
cd ui
npm install
npm run start
```
