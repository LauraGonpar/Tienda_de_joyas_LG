const express = require("express");
const cors = require("cors");
const { obtenerJoyas, obtenerJoyasFiltradas } = require("./consultas");
const app = express();

app.listen(3000, () => {
  try {
    console.log("Servidor encendido en http://localhost:3000");
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
});

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const url = req.url;
  const query = req.query;
  console.log(
    `Hoy se ha consultado la ruta: ${url} Con los parámetros:`,
    query,
  );
  next();
});

app.get("/joyas", async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await obtenerJoyas(queryStrings);
    const results = joyas.map((j) => ({
      name: j.nombre,
      href: `/joyas/joya/${j.id}`,
    }));

    const totalJoyas = joyas.length;
    const stockTotal = joyas.reduce((acc, joya) => acc + joya.stock, 0);
    res.json({ totalJoyas, stockTotal, results });
  } catch (error) {
    res.status(500).send({ error: "Ocurrió un error al obtener las joyas" });
  }
});

app.get("/joyas/filtros", async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await obtenerJoyasFiltradas(queryStrings);
    res.json(joyas);
  } catch (error) {
    res.status(500).send({ error: "Error al aplicar los filtros" });
  }
});
