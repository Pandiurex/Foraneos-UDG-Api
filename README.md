# Foráneos-UDG-Api

### 1-Que es Foraneos-UDG?
Foraneos-UDG es una web-app que ofrece alojamientos cerca de centros universitarios para aquellos estudiantes que requieran hospedaje para continuar con sus estudios.
En esta repo actualmente solo se encuentra la API, posteriormente incorporaremos el Frontend del proyecto.


### 2-Objetivo

El objetivo de este sistema es ofrecer una herramienta web fiable a aquellas personas que están en búsqueda de un lugar donde hospedarse mientras realizan sus estudios (foráneos), así como ofrecer información o detalles de los lugares que están en renta.
Se implementarán las herramientas adecuados para la interacción del cliente con el proveedor del servicio donde se pueda lograr la comunicación directa entre ambos individuos mediante un chat, facilitando la interacción entre estos.

### 3-Módulos y funcionalidad de cada uno

Este proyecto consta de varias entidades las cuales son:

#### 1-Usuarios
En nuestro sistema existen dos tipos de usuarios:
Inquilinos: son aquellos que se hospedaran en algun lugar que se encuentre en renta
Dueño: aquel usuario que ofertara un lugar donde los demas usuarios podran hospedarse 

Los datos que se les solicitaran a los usuarios seran los siguientes:
-Tipo de usuario
-Correo Principal
-Nombre de Usuario
-Contraseña
-Nombre o Nombres
-Primer Apellido
-Segundo Apellido
-Imagen de Perfil
-Genero
-Fecha de Nacimiento 

Los usuarios cuentan con caracteristicas y permisos unicos dependiendo el tipo que se desea manejar, estas caracteristicas se mencionaran mas adelante.

#### 2-Lugares
Los lugares son aquellas pulicaciones que los usuarios dueños publicaran, y el usuario comun o inquilino tendra acceso a esa publicacion para decidir si le parece conveniente hospedarse ahi o simplemente seguir buscando su lugar deseado.
Para poder realizar una publicacion de un lugar se solicitaran los siguientes datos:
-Nombre de la calle
-Colonia
-Numero de habitaciones
-Habitaciones Disponibles
-Precio
-Imagenes del Lugar
-Servicios con los que cuenta

Este apartado estara relacionado con la API de google maps lo cual nos permite acceder a la ubicacion exacta **SIEMPRE Y CUANDO EL DUEÑO QUIERA**, de no ser asi, se pondra una ubicacion aproximada del sitio publicado.

#### 3-Valoraciones o Calificaciones
Siempre que un usuario se hospede en algun lugar que se publico en la pagina, tendra la oportunidad de calificar este lugar de acuerdo a su experiencia, lo cual les facilitara a los demas usuarios la toma de decisiones a la hora de escoger un lugar para hospedarse.
Podra contar con los siguientes aspectos:

-Titulo de la evaluacion
-Comentarios
-Evaluacion de Servicios
-Evaluacion de Seguridad
-Evaluacion de Localizacion
-Evaluacion de relacion Costo-Beneficio

Todas las evaluaciones se manejan con un numero que va desde el 1 al 5
Cada vez que se realiza una valoracion, se realiza un promedio de todas las evaluaciones disponibles que se muestra en la publicacion, lo cual le facilita al usuario a la hora de realizar filtros al momento de buscar publicaciones y para conocer la experiencica de los demas usuarios a la hora de hospedarse en ese lugar.

Tambien existe un sistema de quejas o reportes para aquellas publicaciones que no son adecuadas, el usuario tendra la posibilidad de levantar una queja donde podra seleccionar el tipo o la causa de esta incoformidad, lo cual les permitira a los administradores revisar y realizar acciones para resolver este tipo de problemas.

#### 4-Mensajes
La pagina cuenta con un apartado de mensajes, este servicio funciona de la siguiente manera:
Cada que vez que se crea una nueva publicacion de un lugar, se tiene la oportunidad de que los usuarios que esten interesados puedan contactar con el dueño de esa publicacion, facilitandose la comunicacion entre ambos individuos para poder llegar a acuerdos o simplemente para obtener mas informacion de dicho lugar.

Se administra una "bandeja de entrada" donde se almacenaran todos los mensajes recibidos, facilitandole al usuario un solo lugar disponible para manejar las conversaciones.


### 4-Usuarios, permisos, etc


En esta web-app se consideraron dos tipos de usuarios:

#### 1- Inquilino


El inquilino es considerado el usuario comun, son todos esos alumnos que desean rentar un lugar de los que se encuentran disponibles en el sistema, este tambien podra disponer de la lista completa de lugares que se encuentran publicados en la pagina para posteriormente elegir uno de acuerdo a sus necesidades.

**Caracteristicas Principales**

-Puede interactuar con todas las publicaciones disponibles en el sistema.
-Tiene acceso a un chat personalizado por cada lugar con el que desea interactuar.
-Tendra la oportunidad de valorar los lugares donde se ha hospedado de acuerdo a su experiencia personal.
-Si alguna publicacion la considera ofensiva, puede reportarla indicando su disgusto y se tomara en cuanta para su posterior revision.

**Restricciones**
-Este tipo de usuario **NO** podra publicar contenido dentro de la pagina, a menos que realice un cambio de **Tipo de Usuario** y no se encuentre **ACTIVO** en algun sitio hospedado
-Solo podra reportar una vez por publicacion.


#### 2- Dueño

El dueño es aquel usuario que podra ofrecer un lugar para hospedar a los demas usuarios, podra publicar cualquier cantidad de lugares como desee.


**Caracteristicas Principales**
-Puede publicar cualquier cantidad de lugares para su renta.
-Tiene interaccion directa con los clientes mediante un chat.
-Tendra acceso a una lista de valoraciones dada por los usuarios por cada lugar publicado.
-Contara con un sistema de **MAILBOX** donde podra ver todos sus mensajes en un solo lugar.

**Restricciones**
-No tendra acceso a la posibilidad de rentar u hospedarse en un lugar publicado en el sistema.

### 5-Características técnicas de instalación
**1-Instalar Software**

Para poder trabajar este proyecto en tu maquina, primero que nada tendras que instalar **NVM** en tu equipo, para eso
te dejo el aqui el link del Github oficial de [NVM](https://github.com/creationix/nvm)

Si eres usuario Windows aqui te dejo el link para instalarlo [NVM Window](https://github.com/coreybutler/nvm-windows)

Una vez que hayas instalado NVM, procederemos a instalar Node, para eso podemos usar en la consola 

```nvm install node```

O si eres usuario windows puedes descargarlo directamente desde la pagina oficial de [Node](https://nodejs.org/es/)

Despues tienes que instalar GIT para poder trabajar con este proyecto, para eso puedes acceder a la pagina de [Instalar GIT](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalaci%C3%B3n-de-Git)

Finalmente tendremos que instalar MySql, ya que es el gestor de la Base de Datos que se utiliza en este Proyecto, aqui te dejo el enlace 
a la pagina oficial [MySQL](https://www.mysql.com/downloads/)

El script de la base de datos podras encontrarlo en la **WIKI** de este proyecto.

**2-Clonar Proyecto**

Una vez que ya tengamos todo instalado procedemos a clonar el proyecto
Para eso debemos abrir la terminal del SO que estas utilizando (en el caso de windows abres el GIT-Bash) y escribiremos la siguiente linea de codigo

```git clone https://github.com/Pandiurex/Foraneos-UDG-Api```

Esta linea lo que hace es descargar el codigo del proyecto donde podras acceder al codigo

**3-Instalar Paquetes**

Ahora deberas acceder a la carpeta del proyecto y en tu terminal deberas escribir el siguiente comando:

```npm install```

Esto lo que hara es instalar todos los paquetes necesarios que se encuentran en el package.json del proeycto, como viene siendo **Express**, **Nodemon**, etc. para poder utilizarlos.


### 6-URLs 

Este es el URL donde el proyecto se encuentra:

[Foraneos-UDG](https://api.foraneos-udg.tk/api)


### 7-Usuarios demos (en caso de requerirse)

### 8-Colaboradores

1. Aguayo Gomez, José Miguel - [Mgmez Perfil GitHub](https://github.com/Mgmez/).
1. Carreon Urbano, Alfredo -  [AlfredoCU Perfil GitHub](https://github.com/AlfredoCU).
1. Estrada Panduro, Cristopher Sinhue - [Pandiurex Perfil GitHub](https://github.com/Pandiurex).
1. Gil Carbajal, José Emmanuel  - [JoseEmmanuelGC Perfil GitHub](https://github.com/JoseEmmanuelGC).
