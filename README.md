# Storefront Backend Project

## Preparing

### Install Dependencies
- `npm install`
- `npm install -g db-migrate`

### Setting up .env File
In the root directory the .env File must be created with the following content
```
POSTGRES_HOST: 127.0.0.1
POSTGRES_DB: dev
POSTGRES_USER: 'full_stack_user'
POSTGRES_PASSWORD: 'password123'
POSTGRES_TEST_DB: test
ENV: "test"
BCRYPT_PASSWORD: your-secret-password
PEPPER: mysecret
SALT_ROUNDS: 10
JWT_SECRET_STR: ijdsfanhfds8fgd7
JWT_TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJOaWNsYXMiLCJsYXN0bmFtZSI6IktvbWFuZGVyIiwicGFzc3dvcmRfZGlnZXN0IjoiIn0sImlhdCI6MTY0NTUzODE5M30.SA3VC1t_FAxNel7lOqKDNaTYkCBNXqCy3_IT49ANxG0
```

### Postgres Database
The Application needs an Postgres Database with Port `5434` and the Databases `dev` and `test`.
Also an user `full_stack_user` with password `password123` is needed with the right to create Database.
```
CREATE DATABASE dev;
CREATE DATABASE test;
CREATE USER full_stack_user WITH PASSWORD 'password123';
ALTER USER full_stack_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE dev TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE test TO full_stack_user;
```

## Available Scripts:
- `npm run build` (Builds the code from Typescript in the dist Folder)
- `npm run start` (Starts the Server)
- `npm run watch` (Starts the Server and restarts it on changes)
- `npm run test`  (The Code will be build and the Tests startet)
- `npm run lint`  (The Code will be linted with ESLint)
- `npm run prettier` (The Code will be formatted with Prettier)

## Using the API

The Server is listening on Port `3000`.
In Default the Server starts in Dev Mode.
To change it simply change the "ENV" Variable in the .env File.
For more information on using the Api see [REQUIREMENTS.md](./REQUIREMENTS.md).
