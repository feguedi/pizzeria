# Pizzería

Proyecto de pizzería para personalizar las órdenes y así...

## Objetivo

Ninguno. Solo quiero armar una página web para pedir pizzas.

## Instalar

Ya sea con **[Yarn](https://yarnpkg.com/getting-started/install)** o **NPM**, los comandos funcionan de igual forma.

### Servidor

`$ npm install`

### Cliente

`$ cd client && npm install`

## Construir para producción

`$ cd client`
`$ npm run build`

## Iniciar

Lo recomendable es que se genere un archivo __.env__ con el que se puedan cargar las variables de entorno, tanto para el cliente como para el servidor

- Servidor 
`$ cp .env.example .env`

- Cliente
`$ cp client/.env.example client/.env`

Después de eso se deben cambiar los valores de cada variable de acuerdo al entorno de desarrollo.

Esto solo debe hacerse en entornos de desarrollo; en producción se deben generar las variables de la siguiente manera:

`$ NODE_ENV="production"`
`$ DB_URI="mongodb://localhost:27017/pizzas"`
`$ PORT="1354"`
`$ SECRET_KEY="llavesitacons"`

Una vez modificados los archivos o generadas las variables podemos iniciar el servidor:

`$ npm start`

## Dependencias

### Cliente

(Bueno, así que digas dependencias que tengas que instalar, no)

- Axios
- OpenStreetMap
- React
- D3.js
- Chakra-ui (emotion, emotion-theming)

### Servidor

- **MongoDB**
- Hapi.js

## Estructura de la BD

*Pendiente*
<!-- TODO: crear esquemas de la base de datos -->

## Endpoints

*También pendiente*

## Por hacer

Además de lo que ya se menciona:

- Que HapiJS acepte las rutas de React
- Armar un ícono para el proyecto
