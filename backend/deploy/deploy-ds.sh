#!/bin/sh
dropstack/environment.sh

rm -fr ../deployed.dropstack
mkdir ../deployed.dropstack
cp ../bin/*.* ../deployed.dropstack
cp dropstack/Dockerfile ../deployed.dropstack

cd ../deployed.dropstack
dropstack deploy --compress --verbose --alias totalorder-backend.cloud.dropstack.run --type mono --token $DROPSTACK_TOKEN