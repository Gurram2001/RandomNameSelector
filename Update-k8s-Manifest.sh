#!/bin/bash

set -x

git clone "https://${PAT}@dev.azure.com/haswanthpics/randomselector/_git/randomselector" /tmp/tmp-repo

cd /tmp/tmp-repo

sed -i ''s|image: .*|image: ${containerRegistry}/${imageRepository}:${tag}|'' k8s-file/Deployment.yml

git add .

git commit -m "Updated k8s manifest file though CI-CD"

git push

rm -rf /tmp/tmp-repo

