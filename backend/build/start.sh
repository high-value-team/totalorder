#!/bin/sh

docker run --interactive --env TOTALORDER_BACKEND_DATABASEPATH=/mnt --publish "127.0.0.1:8080:80" --volume ${PWD}/bin:/workdir mono sh << EOF
mono /workdir/to.backend.exe
EOF

