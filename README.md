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

## Go to the `develop-rest-service-part-2` branch

```
git checkout develop-rest-service-part-2
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

## Testing

After application running open new terminal and enter:

To run all tests
 <!-- without authorization -->

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

<!-- To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
``` -->

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
