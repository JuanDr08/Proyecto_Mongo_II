# Proyecto De MongoDB II 🎬

------

## - **Juan David Rodriguez Ospina**

------

## Como empezar?

- Primero que nada, una vez instaladas las dependencias del repo deberemos asignar las respectivas variables de entorno y modificar el nombre del archivo .env.template --> .env

  - Las variables de entorno de administrador del sistema son las siguientes

    ```javascript
    HOST="mongodb://"
    MONGOUSER="Administrador"
    PASSWORD="1234"
    CLUSTER="serveo.net"
    PORT="27018"
    DB_NAME="cineCampus"
    ```

  - El usuario de mongo y la contraseña iran cambiando a medida que  creemos usuarios y queramos trabajar con ellos

  - Cabe recalcar que esas serán las variables de entorno con las que se deberan trabajar si se desea usar mi base de datos, de otro modo, si desea usar su propia base de datos de manera local deberá:

    - Importar los datos de la carpeta storage/data
    - Importar los esquemas de la carpeta storage/schemas
    - Por ultimo debera cambiar las variables de entorno por las que desee usar y que sean compatibles con su base de datos local

- Una vez hecho todo esto podremos lanzar el programa corriendo el siguiente comando

  ```javascript
  npm start
  ```

- De este modo ya tendremos corriendo nuestro programa conectado a la base de datos que hayamos usado

> [!IMPORTANT]
>
> - Cada que cambiemos de variables, ya sea por un cambio de usuario o lo que sea deberemos reiniciar el programa, es decir, volver a ejecutar el comando antes mencionado, de lo contrario se le presentarán problemas
> - Cada que llamemos a un metodo de algunas de las clases que vayamos a utilizar dependiendo del caso de uso, deberá ser llamado dentro de un console.log para poder observar los resultados



## Modo de uso

- Para empezar a utilizar el programa iremos en orden, mencionando el modo de uso de los primeros casos de uso hasta los ultimos

  ### peliculas.js

  - El archivo peliculas.js cuenta con la clase Movies, la cual dispone de multiples metodos que nos permiten tanto listar todas las peliculas en cartelera o listar los detalles de una pelicula especifica

  ### Main.js

  #### Caso de uso 1 y 2

  - Para usar estos metodos deberemos escribir el main de la siguiente forma

    - ##### Listar las peliculas en cartelera
  
      ```javascript
      let pelicula = new m.Movies(); // la forma de importacion requiere llamar primero 'm' y despues el metodo
      
      console.log(await pelicula.showAllCurrentMovies()) // De esta forma podremos observar todas las peliculas del catalogo que estan actualmente en cartelera
      ```

      - Una vez ejecutado este comando deberia ver en consola un arreglo de objetos con los detalles de todas las peliculas en cartelera

    - ##### Listar los detalles de una pelicula especifica
  
      ```javascript
      let pelicula = new m.Movies();
      
      console.log(await pelicula.showMovieDetailsById("66a80379a5aad36c22a20c80"))// Este es el identificador unico de la pelicula la cual deseamos saber, deberá cambiarlo en base a la pelicula que desee conocer y pasarlo como parametro a la función
      ```

      - Una vez ejecutado deberia poder observar en la consola un objeto con los detalles de la pelicula

      - Dado el caso de que el id de la pelicula que ingreso no exista, el programa deberia mostrarle en consola un objeto como este
  
        ```javascript
        {
        	error: "El id ingresado es invalido, recuerde que debe ser un ObjectId existente"
        }
        ```
  
    
    - Eso seria el proceso para completar con exito los casos de uso 1 y 2

- Ahora seguiremos con los procesos de compra de boletos y verificacion de disponibilidad de asientos

  ### boletosYAsientos.js

  - Este archivo contiene lo que vendria siendo la clase de Entries, la cual contiene los distintos metodos relacionados con el tema de boletos y asientos

    #### Casos de uso 3 y 4

    - **API para comprar boletos** 

      ```javascript
      // main.js
      let boletos = new m.Entries() // Se instancia la clase Entries para poder acceder a sus metodos
      
      let obj = { // Declaramos un objeto el cual contenga los datos  que vamos a pasar
          id_funcion: "66a807cca5aad36c22a20ca3", // el id de la funcion a la cual queremos comprar el boleto, dicho id debe existir si se quiere que todo salga con exito
          asiento: "A1", // El codigo del asiento que se desea comprar, el asiento debe existir dentro de la funcion y ademas debe estar disponible para poder ser comprado
          fechaCompra: new Date(), // La fecha en que se realiza la compra
      }
      
      console.log(await boletos.buyEntriesToAFunction(obj)) // Importante llamar al metodo dentro de un console.log para poder observar los resultados, al metodo le pasaremos el objeto que acabamos de crear
      ```

      - Si todos los datos se ingresaron bien el el programa, usted deberia ser capaz de observar un mensaje de retorno como el siguiente

        ```javascript
        {
          acknowledged: true,
          insertedId: new ObjectId('66aa25199263276fbd8bfbcd')
        }
        ```

      - Si no es el caso, puede que le hayan ocurrido problemas con los datos y este observando alguno de los siguientes errores

        ```javascript
        { // Error por si el id de la funcion es incorrecto
            Error: "La funcion ingresada no existe", status: "404"
        }
        
        { // Error por si el asiento ya ha sido ocupado
          Error: 'El asiento ingresado ya esta reservado o no existe',
          status: '409 ',
          asientosSala: [] // arreglo con un listado de los asientos ocupados y los disponibles
        }
        ```

        - Si este es alguno de sus casos porfavor rectifique la autenticidad de los datos que intenta registrar

    - **API para verificar la disponibilidad de asientos**

      - En este caso decidi no solo mostrar los asientos disponibles, sino tambien los ocupados, esto con el fin de acercarme a lo que es comprar boletas en linea en los cines reales, donde nos enseñan cuales si y cuales no

        ```javascript
        let boletos = new m.Entries() // Instanciamos la clase Entries si esque no la tenemos ya
        console.log(await boletos.seatsDisponibility("66a807cca5aad36c22a20ca3")) // Llamamos a este metodo, al cual le debemos pasar el id de la funcion a la cual queremos consultar la disponibilidad de los asientos
        // Cabe mencionar que dicho id debe existir ya
        ```

        - Si el id de la funcion la cual quisimos consultar es corrrecto deberiamos ser capaces de observar en la consola un resultado como el siguiente

          ```javascript
          [
            { codigo: 'A1', estado: 'disponible' },
            { codigo: 'A2', estado: 'reservada' },
            { codigo: 'A3', estado: 'comprada' },
            { codigo: 'B1', estado: 'disponible' },
            { codigo: 'B2', estado: 'reservada' },
            { codigo: 'B3', estado: 'comprada' },
            { codigo: 'C1', estado: 'comprada' },
            { codigo: 'C2', estado: 'comprada' },
            { codigo: 'C3', estado: 'comprada' },
            { codigo: 'D1', estado: 'comprada' },
            { codigo: 'D2', estado: 'comprada' },
            { codigo: 'D3', estado: 'comprada' }
          ]
          ```

          - De otro modo, si el id que haya ingresado no existe, entonces verá en consola un mensaje como este

            ```javascript
            {
            	Error: 'El id de la funcion que ha ingresado no existe', status: "404"
            }
            ```

    #### Casos de uso 5 y 6

    - **Reservar asientos**

      Para poder reservar un asiento es importante conocer:

      1. La funcion en la cual deseamos reservar el asiento
      2. El codigo del asiento de dicha funcion que queremos reservar
      3. Que el asiento este disponible para la reserva

      ```javascript
      let boletos = new m.Entries()
      let obj = { // Objeto que deberemos pasar como parametro, contiene los datos necesarios para la reserva
          funcion_id: "66a807cca5aad36c22a20ca3", // Id de la funcion en donde se encuentra el asiento que queremos reservar
          seatCode: "A1" // Codigo del asiento que vamos a reservar. Debe estar disponible
      }
      console.log( await boletos.reserveSeats(obj)) // Invocacion del metodo encargado de las reservas, le pasamos como parametro el objeto previamente hecho
      ```

      - Si completamos exitosamente la reserva del asiento y todos los datos fueron correctos, deberiamos ser capaces de observar un mensaje como el siguiente

        ```javascript
        {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1
        }
        ```

      - Si este no es su caso y se presento un problema durante la ejecucion de la reserva es probable que haya un dato erroneo y pueda observar un mensaje de salida como los siguientes

        ```javascript
        { // El id de la funcion es erroneo
        	Error: 'El id de la funcion ingresada no existe', status: "404"
        }
        { // El asiento ingresado no existe dentro de la funcion
        	Error: 'El asiento que desea reservar no existe', status: "404", asientos: []
        }
        { // El asiento ingresado si existe dentro de la funcion pero no esta disponible
        	Error: 'El asiento que desea reservar no esta disponible actualmente, escoja otro', 
        	status: "409", 
        	asientos: []
        }
        ```

        - Si alguno de estos es su caso, por favor debe modificar los datos que intenta ingresar

    - **Cancelar reserva**

      Al igual que el proceso de reserva de asientos, para la cancelacion deberá conocer:

      1. Id de la funcion en donde reservo el asiento
      2. Codigo del asiento que  reservo en la funcion
      3. El asiento debe tener el estado de reservada

      ```javascript
      let boletos = new m.Entries()
      let obj = {
          funcion_id: "66a807cca5aad36c22a20ca3", // Id de la funcion en donde se desea realizar la cancelacion
          seatCode: "A1" // Codigo del asiento reservado que deseamos cancelar, el asiento debe existir dentro de la funcion
      }
      console.log(await boletos.cancelBooking(obj))// Metodo que nos permitirá realizar dicha cancelacion, le debemos pasar como parametro el objeto con los datos que creamos
      ```

      - Si todo sale bien y los datos son correctos deberiamos poder observar en la terminal una salida como esta

        ```javascript
        {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1
        }
        ```

      - Y si  tenemos conexion a la base de datos de manerá visual, podremos observar que el asiento que antes estaba reservado pasó a estar disponible

        - Si este no ha sido su caso y se han presentado problemas es posible que vea alguno de los siguientes mensajes de error

          ```javascript
          { // Id de la funcion incorrecto
          	Error: 'El id de la funcion ingresada no existe', status: "404"
          }
          { // El asiento no existe dentro de los registrados en la funcion
          	Error: 'El asiento ingresado no existe', status: "404 ", asientosSala: asientos
          }
          { // El asiento existe dentro de la funcion pero dicho asiento no esta reservado
          	Error: 'El asiento existe, pero su estado no esta reservado, por lo que no hay nada que cancelar', status: 400, asientos: asientos
          }
          ```

          - Si alguno de esos es su caso entonces deberá modificar los datos a algunos que sean correctos para realizar la cancelacion de manera efectiva

    #### Casos de uso 7 y 8

    - **API para aplicar descuentos & API para validar tarjeta VIP**

      - No existe un metodo en si que aplique los descuentos o valide la tarjeta VIP, ya que decidi hacerlo de manerá automatica dentro de la compra

      - **Criterios de descuento:** 

        1. La boleta base tiene un costo de 14.000

        2. Si el usuario esta comprando un silla que corresponde a la fila VIP de la sala entonces el precio de su boleta aumentara en un 97% (precios basados en cinemark)
        3. Si el usuario cuenta con tarjeta VIP se le aplicara un descuento del 20% en el total de su boleta

      - **Dichos descuentos se pueden ser observados aplicandose en el archivo boletosYAsientos.js, desde la linea 43 hasta la 56**

    #### Roles definidos

    - Se crearon los 3 roles propuestos
      1. Administrador - con permisos generales a la base de datos completa
      2. Usuario estandar - cuenta con permisos como:
         - Lectura de usuarios
         - Lectura, Escritura, Edicion de boletos
         - Lectura, Edicion de Funcion
         - Lectura de Pelicula
      3. Usuario Vip - cuenta con permisos como: 
         - Lectura de usuarios
         - Lectura, Escritura, Edicion de boletos
         - Lectura, Edicion de Funcion
         - Lectura de Pelicula

    #### Casos de uso 9 - 12

    ### usuarios.js

    > [!IMPORTANT]
    >
    > Para realizar estos casos de uso, en especial la creacion y edicion de usuarios deberá estar logueado como Administrador del sistema, de lo contrario solo obtendrá excepciones de autenticacion

    - **API para crear usuarios**

      ```javascript
      let user = new m.Users() // Insanciamos la clase Users, la cual contiene los metodos requeridos para estos casos de uso
      
      let obj = {
          Nombre: "Robert Perez", // Nombre del usuario
          Nick: "RBRT", // Nick del usuario - IMPORTANTE este nick será tomado para la creacion del usuario de la cadena de conexion
          contrasenia: 1021513602, // La contraseña del usuario - Será tomada como clave de la cadena de conexion y identificador del usuario, se recomienda sea la cedula o tarjeta de identificacion, ya que esta misma clave será tomada como _id del usuario
          email: "prueba@gmail.com", // email del usuario - se valida con Regex
          telefono: 3222352673 // telefono del usuario
      }
      console.log(await user.createNewUser(obj)) // Invocacion del metodo que crea los usuarios, se le pasa como parametro el objeto recien creado
      ```

      - Es importante tener en cuenta que el Nick y la contrasenia registrados serán los que se deberán reemplazar por el MONGOUSER y PASSWORD en el archivo .env respectivamente para poder conectarnos con la cadena de conexion  creada para dichos usuarios

      - **Un usuario recien creado tendrá por defecto el rol de UsuarioEstandar**

      - La contrasenia tambien será usado como identificador unico del registro del usuario en su respectiva coleccion

      - Si la creacion del usuario se hizo con exito deberiamos ser capaces de observar un mensaje como el siguiente

        ```javascript
        {
          CreacionExitosa: 'Usuario creado con rol estandar',
          usuario: { ok: 1 },
          cliente: { acknowledged: true, insertedId: 1021513602 }
        }
        ```

        - Algunos de los mensajes de fallo en la creacion que podriamos obtener serian

          ```javascript
          { // Este error es porque no esta autorizado a crear usuarios
            ok: 0,
            errmsg: '',
            code: 13,
            codeName: 'Unauthorized'
          }
          { // Este error es por no haber escrito uno de los campos tal cual como esta especificado arriba
              document: "failed validation"
          }
          // Este error es por intentar registrar un usuario con una identificacion que ya se encuentra usada en el sistema
          MongoError: E11000 duplicate key error collection: miBaseDeDatos.miColeccion index: miIndice dup key: { : "valor_duplicado" }
          ```

          - Si alguno de estos errores es su caso por favor, revise cautelosamente las credenciales con las que esta intentando ingresar el nuevo usuario, que la contrasenia sea unica y que todos los datos esten correctamente bien tipados

    - **Api para obtener detalles de un usuario**

      ```javascript
      let user = new m.Users()
      
      console.log(await user.getUserDetails(1021513601))// Invocacion del metodo, se le pasa como argumentos un INT el cual represente la cedula o contrasenia del usuario al cual desea buscar
      ```

      - Si ingresamos correctamente la cedula o identificador del usuario que deseamos conocer deberiamos de poder observar en pantalla un resultado como este

        ```javascript
        {
          Usuario: {
            _id: 1021513601,
            Nombre: 'Juan David',
            Nick: 'JDRO',
            contrasenia: 1021513601,
            email: 'prueba@gmail.com',
            telefono: '3222352673',
            tarjeta: { fechaVencimiento: 2024-07-31T06:07:17.735Z, estado: 'inactiva' }
          },
          roles: [ { role: 'UsuarioVip', db: 'cineCampus' } ]
        }
        ```

        - Si se ingreso de manera incorrecta la cedula o identificacion del usuario obtendremos un mensaje como este y por lo tanto deberemos volverlo a intentar con una identificacion que si exista

          ```javascript
          { 
          	Error: 'El usuario que ha ingresado no existe', status: '404' 
          }
          ```

    - **API para Actualizar Rol de Usuario:**

      ```javascript
      let user = new m.Users()
      let obj = {
          cedula: 1021513601, // Identificacion o cedula del usuario que deseamos  actualizar
          tarjeta: false // IMPORTANTE, LEER LAS INSTRUCCIONES ABAJO
      }
      
      console.log(await user.updateUserRole(obj)) // Invocamos el metodo que nos permite actualizar y le pasamos el objeto con los detalles de la actualizacion
      ```

      - El campo de 'tarjeta' es sumamente importante, ya que con este decidimos que accion tomar
        - Si dejamos el campo en TRUE, al usuario se le asignara una tarjeta VIP, y el rol del usuario pasará a ser UsuarioVip
        - Si dejamos el campo en FALSE, al usuario se le cambiara el estado de la tarjeta a inactiva, y pasara de ser UsuarioVip a UsuarioEstandar

      - Si realizamos correctamente el registro del objeto y el usuario existe obtendremos una salida como esta

        ```javascript
        {
          'ActualizaciónExitosa': 'Rol del usuario actualizado',
          usuario: { ok: 1 }
        }
        ```

      - Si el usuario al que le queremos modificar el rol no existe, obtendremos una salida como esta

        ```javascript
        {
        	Error: 'El usuario que ha ingresado no existe', status: "404"
        }
        ```

    - **API para Listar Usuarios:**

      ```javascript
      let user = new m.Users()
      
      console.log(await user.showAllUsers("estandar"))// Invocacion del metodo para buscar el usuario, se le da como parametro el filtro que queremos, LEER INSTRUCCIONES ABAJO
      ```

      - Sencillo, tenemos cuatro posibles filtros, estandar, vip, admin y " "
        - Deberemos escoger cualquiera de ellos dependiendo del tipo de usuario que queramos listar
        - Los filtros pueden estar en mayuscula o minuscula, eso da igual, pero tienen que estar escritos tal cual como estan plazmados
        - El filtro " " lo que hace es no aplicar filtro y simplemente nos trae todos lo detalles de todos los usuarios

      - Por ejemplo, si aplicamos el filtro de estandar deberiamos obtener un resultado como el siguiente

        ```javascript
        [
          {
            _id: 1234567890,
            Nombre: 'Juan Perez Gomez',
            Nick: 'juanpg',
            contrasenia: 1234567890,
            email: 'juanpg@example.com',
            telefono: '3125551212',
            tarjeta: { estado: 'inactiva' }
          },
          {
            _id: 1234,
            Nombre: 'Admin',
            Nick: 'Admin',
            contrasenia: 1234,
            email: 'admin@gmail.com',
            telefono: '3222352673'
          },
          {
            _id: 1021513601,
            Nombre: 'Juan David',
            Nick: 'JDRO',
            contrasenia: 1021513601,
            email: 'prueba@gmail.com',
            telefono: '3222352673',
            tarjeta: { estado: 'inactiva' }
          }
        ]
        ```

        - Algunos de los errores que nos pueden ocurrir son errores de autenticacion, pero eso ya depende de las credenciales que se usen

​				
