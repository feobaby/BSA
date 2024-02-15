# Back-End written in TypeScript.

## :rocket: Quick start

1.  Have Git and Node.js installed on your computer.
2.  Clone the repo.
3.  cd into the project `bsa`, cd into both `Back-Ends` and cd into the `TypeScript` folder to install
    the dependencies using `yarn install`.
4.  You can do a quick database creation, migration and seeding using the command:`yarn run start:db`.
5.  Create a `.env` file in the folder and add the necessary variables following the _.env.sample_ format.
6.  Run `yarn run start:dev` to start the backend server.
7.  Run `yarn run test` to run tests for the backend server.

## :star: Tools used

1. TypeScript
2. Node.js
3. Expressjs
4. Sequelize ORM
5. PostgreSQL
6. Jest

## :sunny: Sample .env file format

```
SECRET=
DEV_DATABASE_URL=
TEST_DATABASE_URL=
PORT=<should be 3000>
DB_USER=
DB_PASS=
DB_NAME=bsa
DB_USER_TEST=
DB_PASS_TEST=
DB_NAME_TEST=
```

## :heart: Quick note

This folder only houses the code written in TypeScript. The APIs functionalities are all the same acrross all back-ends.
You can find more about the APIs in `Back-Ends/README.md`
