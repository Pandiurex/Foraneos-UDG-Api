# Foráneos-UDG-Api

### 1-Que es Foraneos-UDG?
Foraneos-UDG es una web-app que ofrece alojamientos cerca de centros universitarios para aquellos estudiantes que requieran hospedaje para continuar con sus estudios.
En esta repo actualmente solo se encuentra la API, posteriormente incorporaremos el Frontend del proyecto.


### 2-Objetivo

El objetivo de este sistema es ofrecer una herramienta web fiable a aquellas personas que están en búsqueda de un lugar donde hospedarse mientras realizan sus estudios (foráneos), así como ofrecer información o detalles de los lugares que están en renta.
Se implementarán las herramientas adecuados para la interacción del cliente con el proveedor del servicio donde se pueda lograr la comunicación directa entre ambos individuos mediante un chat, facilitando la interacción entre estos.

### 3-Módulos y funcionalidad de cada uno

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

Este es el URL donde el proyecto se encuentra

**LINK**


### 7-Usuarios demos (en caso de requerirse)

### 8-Colaboradores

1. Aguayo Gomez, José Miguel - [Mgmez Perfil GitHub](https://github.com/Mgmez/).
1. Carreon Urbano, Alfredo -  [AlfredoCU Perfil GitHub](https://github.com/AlfredoCU).
1. Estrada Panduro, Cristopher Sinhue - [Pandiurex Perfil GitHub](https://github.com/Pandiurex).
1. Gil Carbajal, José Emmanuel  - [JoseEmmanuelGC Perfil GitHub](https://github.com/JoseEmmanuelGC).
