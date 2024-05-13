#!/usr/bin/env bash

version=0.0.0-alpha
imageName=pikuafk/track-web-vitals-2:$version
containerName=track-web-vitals-2

# remove previous images if present
docker container stop $containerName
docker container rm $containerName
docker image rm $imageName

# create image
docker build -t pikuafk/track-web-vitals-2:$version .
docker run -d --env-file .env.prod -p 3000:3000 --name $containerName $imageName
