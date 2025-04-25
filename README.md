## It Patagonia Challenge

## Endpoints

### `GET /transfers`

Por default trae las empresas que hicieron transferencia el ultimo mes. Acepta query params fromDate y toDate para filtrar por fecha.

### `GET companies/enrollments`

Por default trae las empresas que hicieron transferencia el ultimo mes. Acepta query params fromDate y toDate para filtrar por fecha.

### `POST companies`

Crea una nueva empresa.

## Conexión a la base de datos

Cambiar el nombre del .env.template a .env y pegar el string url que esta en el mail en DATABASE_URL=

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
