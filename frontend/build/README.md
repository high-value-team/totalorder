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

create and configure environment files (e.g. .env.development)
```
cp "environment examples"/dropstack .env.dropstack
cp "environment examples"/development .env.development
cp "environment examples"/production .env.production
```

## Run Tasks

```
run start  // start frontend on local machine
run build  // build frontend into bin directory
run deploy // deploy to dropstack
```

