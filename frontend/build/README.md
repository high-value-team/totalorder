# Build Scripts

## Prerequisites

* node v9.5.0
* npm v5.6.0
* yarn v0.23.4

```
brew install node@9
npm install -g npm@5.6.0
npm install -g yarn@0.23.4
```

install build dependencies
```
yarn install
```

## Run Tasks

`run [taskname]`

e.g. `run start`

Available tasks:
```
setup                           - Create environment files, e.g. env.production. Please edit files with useful values!
install                         - Install all dependencies in "src" folder
start                           - Run frontend start scripts using env.development
start:development               - Run frontend start scripts using env.development
start:production                - Run frontend start scripts using env.production
build                           - Run frontend build scripts using env.production
build:production                - Run frontend build scripts using env.production
build:development               - Run frontend build scripts using env.development
deploy                          - Create deploy folder and deploy to Dropstack
clean:install                   - Remove installed libraries in "src" folder
clean:build                     - Remove all "bin" folders
clean:deploy                    - Remove all "deploy" folders
```

Execute `run` to list all available tasks