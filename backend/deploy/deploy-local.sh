#!/bin/sh
rm -fr ../deployed.locally
mkdir ../deployed.locally
cp ../bin/*.* ../deployed.locally
cp local/run.sh ../deployed.locally
cd ../deployed.locally