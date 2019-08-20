# Running the backend

## Prerequisites

You'll need Python 3.7 installed. Code snippets below assume `python`
in your system points to Python 3.

## Preparation

`cd` into the checkout directory and then:

```
cd be
python -m venv <my-virtual-env-name> # you might want to try python3 if that's your case
source <my-virtual-env-name>/bin/activate
pip install -r requirements.txt
```

## Running the server

```
API_KEY=<your-google-api-key> SEARCH_ENGINE_ID=<your-search-engine-id> uvicorn main:app
```

This will give you a server listening on `http://localhost:8000`. There is also
a GraphQL playground served from the same url.

For live code reload try:

```
API_KEY=<your-google-api-key> SEARCH_ENGINE_ID=<your-search-engine-id> uvicorn --reload main:app
```

## Running unittests

```
python -m unittest
```

# Running the frontend

## Prerequisites

You'll need NodeJS (`node` & `npm`) in a fairly recent version. There is an `.nvmrc`
file in `fe` directory if you're a `nvm` king of guy...

## Preparation

`cd` into the checkout directory and then:

```
cd fe
nvm use
npm install
```

## Running the app

```
REACT_APP_API_ROOT=http://localhost:8000 npm start
```

This will give you a development environment (webpack-dev-server with auto reload).

## Running unittests

```
CI=1 npm test
```

Or for development mode:

```
npm test
```

## Packaging the app

If you want a packaged version just run:

```
REACT_APP_API_ROOT=http://localhost:8000 npm run build
```

# e2e tests

## Preparation

Make sure you're running the GraphQL server at `http://localhost:8000` and the
frontend is accessible at `http//localhost:3000`. These values are hardcoded
for the e2e tests.

## Developing e2e tests

`cd` into the checkout directory and then:

```
cd fe
nvm use
# nvm install # you probably did it before running the frontend
npm run e2e open
```

This will open cypress in interactive mode.

## Running e2e tests

To run the e2e tests headless:

```
npm run e2e run
```

You can also run headed:

```
npm run e2e run -- --headed
```