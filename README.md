💎 Desafío: Tienda de Joyas "My Precious Spa"
Este proyecto es una API REST construida con Node.js, Express y PostgreSQL. Su objetivo es gestionar el inventario de una joyería de lujo, permitiendo a los usuarios buscar piezas por filtros específicos, ordenar los resultados y navegar de forma inteligente a través de enlaces (HATEOAS).


🚀 Funcionalidades Principales
Inventario Inteligente (HATEOAS): Al consultar las joyas, no solo recibes los datos, sino también enlaces directos para ver más detalles.

Filtros Avanzados: Puedes buscar joyas por metal (oro, plata), categoría (anillo, collar) y rangos de precio.

Paginación y Orden: Controla cuántas joyas ver por página y ordénalas por precio de mayor a menor (o viceversa).

Seguridad: Implementación de consultas parametrizadas para evitar ataques de SQL Injection.

Reportes en Tiempo Real: Un sistema que registra cada consulta hecha al servidor en la consola.

🛠️ Guía de Instalación y Ejecución
Sigue estos pasos para tener el proyecto corriendo en tu computadora:

1. Preparar la Base de Datos 🗄️
Necesitas tener instalado PostgreSQL. Abre tu terminal o herramienta favorita (como pgAdmin) y ejecuta:

CREATE DATABASE joyas;

\c joyas;

CREATE TABLE inventario (id SERIAL, nombre VARCHAR(50), categoria
VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);

INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);

2. Clonar e Instalar Librerías 📦
En la carpeta de tu proyecto, abre una terminal y descarga las herramientas necesarias:

# Inicia el proyecto de Node
npm init -y

# Instala las 3 herramientas clave
npm install express pg pg-format

3. Configurar la Conexión 🔑
Asegúrate de que en tu archivo consultas.js (o donde tengas la conexión) los datos coincidan con tu PostgreSQL:

user: Tu nombre de usuario (por defecto suele ser postgres).

password: La contraseña que elegiste al instalar PostgreSQL.

database: joyas.

4. ¡Encender el Servidor! 🔥
En tu terminal, ejecuta el siguiente comando:

node index.js

Si ves el mensaje "Servidor encendido en el puerto 3000", ¡felicitaciones! Tu joyería virtual está abierta.

🧪 Cómo probar el desafío
Una vez encendido, abre tu navegador y pega estas direcciones para ver la magia:

Ver todas las joyas (con links): http://localhost:3000/joyas

Ver solo 2 joyas (Paginación): http://localhost:3000/joyas?limits=2&page=1

Filtrar por oro y precio máximo: http://localhost:3000/joyas/filtros?metal=oro&precio_max=30000
