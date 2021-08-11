#!/bin/bash

echo "Build go"
GOOS=linux GOARCH=amd64 go build -o bin/mockchamp ./cmd/mockchamp

echo "Build js"
cd ui || exit; yarn build; cd ../

echo "Build docker image"
docker build -t sergeyhartmann/mockchamp .

echo "Successful"
