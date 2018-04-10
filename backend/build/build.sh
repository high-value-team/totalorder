#!/bin/sh

# cleanup
rm -rf bin
mkdir bin

# build sources
docker run -i -v ${PWD}/bin:/binDir -v ${PWD}/../src:/srcDir mono sh << EOF 
msbuild /p:OutDir=/binDir /srcDir/to.backend/to.backend.sln
EOF
