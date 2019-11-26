  
# zeltlager.guru Backend

This is the backend in development for the upcoming zeltlager.guru project.
The project is not yet in production.

## Description

This project is powered by [NestJS](https://nestjs.com/), a progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications, heavily inspired by [Angular](https://angular.io).

It makes use of TypeORM with PostgreSQL and provides a GraphQL-Server built on Apollo using the code-fist approach.


## Running the app

```bash
# Seeding process to setup initial users and data
$ yarn seed

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

While in development mode the database is running in synchronize mode, this is not the case in production to avoid data loss.  
If entities are changed, the database will not immediateley reflect the changes.  
The developer has to generate a new migration.

**Example:**  
```
yarn typeorm migration:generate -- -n AddFieldToEntity
```

All migration files are saved inside `/migration`.

### Running migrations on application update
If the developer delivered a new version of the application which includes database changes, you have to run all pending migrations before `yarn start:prod`, otherwise internal server errors will occur!

```
yarn typeorm migration:run
```
This command will execute all pending migrations and run them in a sequence ordered by their timestamps. This means all sql queries written in the up methods of your created migrations will be executed. That's all! Now you have your database schema up-to-date.

If for some reason you want to revert the changes, you can run:
```
yarn typeorm migration:revert
```
This command will execute down in the latest executed migration. If you need to revert multiple migrations you must call this command multiple times.
