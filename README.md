# CAR API

## Environment
**1. Create .env file in root directory**

  1. NODE_ENV=[dev, prod]
  2. DISCOUNT=20
  3. START_MONTH=12
  4. END_MONTH=18
  5. PORT=3000
  6. POSTGRES_PORT=5432
  7. POSTGRES_USER=admin
  8. POSTGRES_PASSWORD=admin
  9. POSTGRES_DB=cars
  10. PGADMIN_DEFAULT_EMAIL=admin@admin.com
  11. PGADMIN_DEFAULT_PASSWORD=admin

## Development:

Set NODE_ENV=dev

Run:
```shell
npm i
npm run db:up
npm run cars:dev
```
Navigate to http://localhost:3000/api

## Production:

Set MODE_ENV=prod

Run: 
```shell
npm run cars
```
Navigate to http://localhost:3000/api

Stop:
```shell
npm run cars:stop
```
## Tests:
* To run unit tests, run:
```shell
npm run test
```
* To run e2e tests:

```shell
npm i
npm run db:up
npm run test:e2e
```
