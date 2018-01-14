#!/bin/sh
rm -fr ../deployed.locally
mkdir ../deployed.locally
mkdir ../deployed.locally/db
cp ../bin/*.* ../deployed.locally
cp locally/run.sh ../deployed.locally

cd ../deployed.locally
./run.sh