# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/totoogg/nodejs2024Q3-service.git
```

## Go to folder `nodejs2024Q3-service`

```
cd nodejs2024Q3-service
```

## Go to the `develop-rest-service-part-3` branch

```
git checkout develop-rest-service-part-3
```

## Installing NPM modules

```
npm install
```

## Running application

Install [Docker Desktop](https://www.docker.com/) and run it

In the terminal, enter the command

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Stoping application

```
docker compose down
```

## Vulnerabilities scanning

```
npm run scan:scout
```

## Logging

Set environment variables for logging in the `.env` file.

Logging level - `LOG_LEVEL`:
`0` - error;
`1` - error, warn;
`2` - error, warn, log; (default)
`3` - error, warn, log, debug;
`4` - error, warn, log, debug, verbose;

Maximum size of logged files in kB (default 20kB) - `FILE_LOG_SIZE`.

After changing variables `LOG_LEVEL` and `FILE_LOG_SIZE`, delete the image, container in Docker and rebuild them.

Logs and errors are written to different files. They can be seen in the `logs` folder in the project or docker.

To check for `uncaughtException` and `unhandledRejection` errors, uncomment the code in the src/main.ts.

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
