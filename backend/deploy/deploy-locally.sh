#!/bin/sh
rm -fr ../deployed.locally
mkdir ../deployed.locally
cp ../bin/*.* ../deployed.locally
cp locally/run.sh ../deployed.locally

echo "To run go to ../deployed.locally and start ./run.sh"