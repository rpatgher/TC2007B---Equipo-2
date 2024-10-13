# Backend del proyecto

## Arquitectura de la API

La arquitectura es MVC (Model View Controller)....

## Models

- User (para registro de usuarios)

- Donation (para registro de donaciones)

- Projects (para registro de proyectos)

## Controllers

### Controllers de los Usuarios (Modelo User)

- `createUser`: Esta función sirve para crear nuevos usuarios. Esta función puede ser accedida sin autorización alguna y sirve para que los donadores creen sus cuentas para posteriomente poder donar.

- `getUsers`: Esta función sirve para obtener todos lo usuarios. Esta función tiene autorización para que únicamente pueda ser accecida sí el usuario está loggeado y si es administrador. 

- `getUser`: Esta función sirve para obtener la información de únicamente un donador. Esta cuenta con autorización, ya que solo puede ser accedida por ese mismo donador y por todos los adminstradores (que tienen que estar loggeados).

- `updateUser`: Esta función sirve para actualizar la información de un usuario. Esta tiene autorización, para que solo pueda acceder a ella el usuario y los administradores (que tienen que estar loggeados).

- `deleteUser`: Esta función sirve para eliminar el registro de un usuario. Esta función tiene autorización, ya que solo puede ser accedida por el usuario que quiere eliminar su cuenta y por los administradores (que tienen que estar loggeados).

### Controllers de las Donaciones (Modelo Donation)

- `createDonation`: Esta función sirve para crear nuevas donaciones. Esta función cuenta con autorización, ya que para hacer una nueva donación debes estar loggeado. Pueden acceder a esta función todos los usuarios.

- `getDonations`: Esta función sirve para obtener todos lo usuarios. Esta función tiene autorización para que únicamente pueda ser accecida sí el usuario está loggeado y si es administrador. 

- `getDonation`: Esta función sirve para obtener la información de únicamente una donación. Esta cuenta con autorización, ya que solo puede ser accedida por ese mismo donador y por todos los adminstradores (que tienen que estar loggeados).

- `updateDonation`: Esta función sirve para actualizar la información de una donación. Esta tiene autorización, para que solo pueda acceder a ella el donador y los administradores (que tienen que estar loggeados).

- `deleteDonation`: Esta función sirve para eliminar registros de donaciones. Esta función tiene autorización, ya que solo puede ser accedida por los administradores (que tienen que estar loggeados).

### Controllers de los Proyectos (Modelo Project)

- `createProject`: Esta función sirve para crear nuevos proyectos. Esta función puede ser accedida unicamente por los administradores.

- `getProjects`: Esta función sirve para obtener todos lo proyectos. Esta función tiene autorización para que únicamente pueda ser accecida sí el usuario está loggeado y si es administrador. 

- `getProject`: Esta función sirve para obtener la información de únicamente un proyecto. Esta cuenta con autorización, ya que solo puede ser accedida por todos los adminstradores (que tienen que estar loggeados).

- `updateProject`: Esta función sirve para actualizar la información de un proyecto. Esta tiene autorización, para que solo pueda acceder los administradores (que tienen que estar loggeados).

- `deleteProject`: Esta función sirve para eliminar un registro de un proyecto . Esta función tiene autorización, ya que solo puede ser accedida por los administradores (que tienen que estar loggeados).

## Views

En este caso la aplicación hecha con React es la que toma el papel de vistas en esta aplicación.