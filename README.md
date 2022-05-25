[[RU](./README.md)] [[EN](./README_en.md)]

:muscle: MockChamp - open-source инструмент для мока HTTP API. MockChamp написан на Go и распространяется как 
[docker container](https://hub.docker.com/r/sergeyhartmann/mockchamp).

## Начало работы c MockChamp

```
docker run -p 8181:8181 sergeyhartmann/mockchamp
```

На `localhost:8181` будет запущен HTTP сервер. Он принимает входящие запросы и отдает фейковый ответ,
в зависимости от настроенных правил. Вы можете создать их используя специальное API или веб интерфейс.

Зарезервированные HTTP роуты:

- http://localhost:8181/__ui - веб интерфейс.
- http://localhost:8181/__api - API.

Вы можете инициализировать MockChamp набором правил из json файлов. Для этого, при старте контейнера
монтируйте свои `*.json` файлы (для примера см. `dockerfiles/rules.json`) в рабочий каталог `/mockchamp` docker container'a.

```
docker run -p 8181:8181 -v $(pwd)/dockerfiles:/mockchamp sergeyhartmann/mockchamp
```

## Переменные окружения

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

Если у HTTP сервера нет подходящего правила для входящего запроса, то он будет проксирован на указанный хост.
В случае если прокси хост не указан, сервер вернет HTTP Status код 200 OK.

`RESPONSE_STATUS_CODE`

Если у HTTP сервера нет подходящего правила для входящего запроса, то сервер вернет указанный HTTP Status код.

`PERSIST_MODE`

Если включен персистентный режим, то все созданные правила через API или веб интерфейс будут сохранены 
между рестартами docker container'a.


## Разработка

1. Склонируйте репозиторий

```
git clone https://github.com/sergeyhartmann/mockchamp
cd mockchamp
```

2. Запустите `main.go`

```
go run cmd/mockchamp/main.go
```

3. Для веб интерфейса запустите React App

```
cd ui
npm install
npm run start
```
