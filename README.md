# Foráneos-UDG-Api

### 1.-¿Qué es Foraneos-UDG?
Foraneos-UDG es una web-app que ofrece alojamientos cerca de centros universitarios para aquellos estudiantes que requieran hospedaje para continuar con sus estudios.
En esta repo actualmente solo se encuentra la API, posteriormente incorporaremos el Frontend del proyecto.


### 2.-Objetivo.

El objetivo de este sistema es ofrecer una herramienta web fiable a aquellas personas que están en búsqueda de un lugar donde hospedarse mientras realizan sus estudios (foráneos), así como ofrecer información o detalles de los lugares que están en renta.
Se implementarán las herramientas adecuados para la interacción del cliente con el proveedor del servicio donde se pueda lograr la comunicación directa entre ambos individuos mediante un chat, facilitando la interacción entre estos.

### 3.-Módulos y funcionalidad de cada uno.

Este proyecto consta de varias entidades las cuales son:

#### 1.-Usuarios.
En nuestro sistema existen dos tipos de usuarios:
Inquilinos: son aquellos que se hospedaran en algún lugar que se encuentre en renta
Dueño: aquel usuario que ofertara un lugar donde los demás usuarios podrán hospedarse 

Los datos que se les solicitará a los usuarios serán los siguientes:

-Tipo de usuario.
-Correo Principal.
-Nombre de Usuario.
-Contraseña.
-Nombre o Nombres.
-Primer Apellido.
-Segundo Apellido.
-Imagen de Perfil.
-Género.
-Fecha de Nacimiento.

Los usuarios cuentan con características y permisos únicos dependiendo el tipo que se desea manejar, estas características se mencionan más adelante.

#### 2.-Lugares.
Los lugares son aquellas publicaciones que los usuarios dueños publicaran, y el usuario común o inquilino tendrá acceso a esa publicación para decidir si le parece conveniente hospedarse ahí o simplemente seguir buscando su lugar deseado.
Para poder realizar una publicación de un lugar se solicitarán los siguientes datos:

-Nombre de la calle.
-Colonia.
-Número de habitaciones.
-Habitaciones Disponibles.
-Precio.
-Imagenes del Lugar.
-Servicios con los que cuenta.

Este apartado estará relacionado con la API de google maps lo cual nos permite acceder a la ubicación exacta **SIEMPRE Y CUANDO EL DUEÑO QUIERA**, de no ser así, se pondrá una ubicación aproximada del sitio publicado.

#### 3.-Valoraciones o Calificaciones.
Siempre que un usuario se hospede en algún lugar que se publicó en la página, tendrá la oportunidad de calificar este lugar de acuerdo a su experiencia, lo cual les facilitará a los demás usuarios la toma de decisiones a la hora de escoger un lugar para hospedarse.
Podrá contar con los siguientes aspectos:

-Título de la evaluación.
-Comentarios.
-Evaluación de Servicios.
-Evaluación de Seguridad.
-Evaluación de Localización.
-Evaluación de relación Costo-Beneficio.

Todas las evaluaciones se manejan con un número que va desde el 1 al 5
Cada vez que se realiza una valoración, se realiza un promedio de todas las evaluaciones disponibles que se muestra en la publicación, lo cual le facilita al usuario a la hora de realizar filtros al momento de buscar publicaciones y para conocer la experiencia de los demás usuarios a la hora de hospedarse en ese lugar.

También existe un sistema de quejas o reportes para aquellas publicaciones que no son adecuadas, el usuario tendrá la posibilidad de levantar una queja donde podrá seleccionar el tipo o la causa de esta inconformidad, lo cual les permitirá a los administradores revisar y realizar acciones para resolver este tipo de problemas.

#### 4.-Mensajes.
La página cuenta con un apartado de mensajes, este servicio funciona de la siguiente manera:
Cada que vez que se crea una nueva publicación de un lugar, se tiene la oportunidad de que los usuarios que estén interesados puedan contactar con el dueño de esa publicación, facilitando la comunicación entre ambos individuos para poder llegar a acuerdos o simplemente para obtener más información de dicho lugar.

Se administra una "bandeja de entrada" donde se almacenarán todos los mensajes recibidos, facilitando al usuario un solo lugar disponible para manejar las conversaciones.


### 4.-Usuarios, permisos, etc.


En esta web-app se consideraron dos tipos de usuarios:

#### 1.-Inquilino.


El inquilino es considerado el usuario común, son todos esos alumnos que desean rentar un lugar de los que se encuentran disponibles en el sistema, este también podrá disponer de la lista completa de lugares que se encuentran publicados en la página para posteriormente elegir uno de acuerdo a sus necesidades.

**Características Principales**

-Puede interactuar con todas las publicaciones disponibles en el sistema.
-Tiene acceso a un chat personalizado por cada lugar con el que desea interactuar.
-Tendrá la oportunidad de valorar los lugares donde se ha hospedado de acuerdo a su experiencia personal.
-Si alguna publicación la considera ofensiva, puede reportarla indicando su disgusto y se tomará en cuenta para su posterior revisión.

**Restricciones**

-Este tipo de usuario **NO** podrá publicar contenido dentro de la página, a menos que realice un cambio de **Tipo de Usuario** y no se encuentre **ACTIVO** en algún sitio hospedado
-Solo podrá reportar una vez por publicación.


#### 2.-Dueño.

El dueño es aquel usuario que podrá ofrecer un lugar para hospedar a los demás usuarios, podrán publicar cualquier cantidad de lugares como desee.


**Características Principales**

-Puede publicar cualquier cantidad de lugares para su renta.
-Tiene interacción directa con los clientes mediante un chat.
-Tendrá acceso a una lista de valoraciones dada por los usuarios por cada lugar publicado.
-Contará con un sistema de **MAILBOX** donde podrá ver todos sus mensajes en un solo lugar.

**Restricciones**

-No tendrá acceso a la posibilidad de rentar u hospedarse en un lugar publicado en el sistema.

### 5.-Características técnicas de instalación.
**1.-Instalar Software.**

Para poder trabajar este proyecto en tu máquina, primero que nada tendrás que instalar **NVM** en tu equipo, para eso
te dejo el aqui el link del Github oficial de [NVM](https://github.com/creationix/nvm)

Si eres usuario Windows aqui te dejo el link para instalarlo [NVM Window](https://github.com/coreybutler/nvm-windows)

Una vez que hayas instalado NVM, procederemos a instalar Node, para eso podemos usar en la consola 

```nvm install node```

O si eres usuario windows puedes descargarlo directamente desde la pagina oficial de [Node](https://nodejs.org/es/)

Despues tienes que instalar GIT para poder trabajar con este proyecto, para eso puedes acceder a la pagina de [Instalar GIT](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalaci%C3%B3n-de-Git)

Finalmente tendremos que instalar MySql, ya que es el gestor de la Base de Datos que se utiliza en este Proyecto, aquí te dejo el enlace 
a la pagina oficial [MySQL](https://www.mysql.com/downloads/)

El script de la base de datos podrás encontrarlo en la **WIKI** de este proyecto.

**2.-Clonar Proyecto.**

Una vez que ya tengamos todo instalado procedemos a clonar el proyecto
Para eso debemos abrir la terminal del SO que estas utilizando (en el caso de windows abres el GIT-Bash) y escribiremos la siguiente línea de código

```git clone https://github.com/Pandiurex/Foraneos-UDG-Api```

Esta línea lo que hace es descargar el código del proyecto donde podrás acceder al código

**3.-Instalar Paquetes.**

Ahora deberás acceder a la carpeta del proyecto y en tu terminal deberás escribir el siguiente comando:

```npm install```

Esto lo que hará es instalar todos los paquetes necesarios que se encuentran en el package.json del proyecto, como viene siendo **Express**, **Nodemon**, etc. para poder utilizarlos.


### 6.-URLs.

Este es el URL donde el proyecto se encuentra:

[Foraneos-UDG](https://api.foraneos-udg.tk/api)


### 7.-Usuarios demos (en caso de requerirse).

### 8.-Colaboradores.

1. Aguayo Gomez, José Miguel - [Mgmez Perfil GitHub](https://github.com/Mgmez/).
1. Carreon Urbano, Alfredo -  [AlfredoCU Perfil GitHub](https://github.com/AlfredoCU).
1. Estrada Panduro, Cristopher Sinhue - [Pandiurex Perfil GitHub](https://github.com/Pandiurex).
1. Gil Carbajal, José Emmanuel  - [JoseEmmanuelGC Perfil GitHub](https://github.com/JoseEmmanuelGC).

