# Introduction

This repository contains a boilerplate for a Node backend with an architecture based on DDD/CQRS.

# Setup

```
npm install
```

# Tests (BDD/Cucumber)

## Run tests

### Mixed

Run critical tests with `sqlite3` data persistence and other tests with `in-memory` data persistence:

```
npm test
```

### In-memory

Run tests with `in-memory` data persistence:

```
npm run test:inmemory
npm run test:inmemory:only # run scenarios tagged with @only
```

### Sqlite3

Run tests with `sqlite3` data persistence:

```
npm run test:sqlite3
npm run test:sqlite3:only # run scenarios tagged with @only
```

## Debug tests (with VSCode)

Some VSCode configurations are set in `.vscode` folder to run tests tagged with `@only` and attach the debugger to the session.
Set "RUN AND DEBUG" configuration in VSCode Debug panel then start a debug session with 'F5'.

Configurations:

- `Cucumber InMemory @only`: Debug with `in-memory` data persistence
- `Cucumber Sqlite3 @only`: Debug with `sqlite3` data persistence

# Run REST backend server

## With in-memory implementation

Use REST Client VSCode plugin to send queries using `calls/watchlist.rest` file.

### Normal mode

```
npm run start:inmemory
```

### Dev mode (live auto-build)

```
npm run dev:inmemory
```

# Next

- Switch persistence in production
- MySql persistence with docker
- scripts for run with containers
- e2e tests with test containers
- Error handling
