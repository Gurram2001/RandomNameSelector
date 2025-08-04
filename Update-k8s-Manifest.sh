#!/bin/bash

set -x
set -e
imageValue=${containerRegistry}/${imageRepository}:$tag
[ -d "/tmp/tmp-repo" ] && rm -rf /tmp/tmp-repo
git clone "https://$PAT@dev.azure.com/haswanthpics/randomselector/_git/randomselector" /tmp/tmp-repo

cd /tmp/tmp-repo

sed -i "s|image: .*|image: $imageValue|" k8s-file/Deployment.yml

git add .

git commit -m "Updated k8s manifest file though CI-CD with tag: $tag"

git push

rm -rf /tmp/tmp-repo

