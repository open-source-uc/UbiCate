# TODO

## Crear backend

Crear un backend para mantener facilmente las ubicaciones.
Este backend deberá:
- Permitir exportar todas las ubicaciones en formato JSON
  Se puede separar por sector si es necesario.
- Permitir guardar información geoespacial
- Guardar 2 cosas:
  - Los ubicaciones en sí
  - Guardar sugerencias de cambios (añadir o modificar lugar).



mkdir ./db
sudo mongod --dbpath ./db

## Mejorar la búsqueda de ubicaciones

Creo que es mejor dejar que el cliente se encargue de las busquedas,
así el backend no tiene que ser usado tanto (el endpoint principal
sería el que entrega todos los datos).

Tal vez se pueda usar WebAssembly. Busque antes librerias en JS para
la busqueda en documentos JSON y las principales tienen fallas.
Parece que hay una en Rust buena.


## Ordenar mejor las páginas y componentes, añadir faltantes

Ahora todo está como un macro componente en la página `/map`, se podria
ordenar mejor. Además, faltan un par de páginas como la de más información,
la de añadir ubicación y la de sugerir cambios.


## Tutorial rápido a svelte

Alguien cachará bien svelte? Podria hacer una intro rápida en un doc aparte.


## Usar localstorage para guardar datos del usuario

- Donde estaba en el mapa
- etc

