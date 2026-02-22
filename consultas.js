const { Pool } = require("pg");
const format = require("pg-format");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "joyas",
  password: "963574",
  port: 5432,
  allowExitOnIdle: true,
});

const obtenerJoyas = async ({ limits = 10, page = 1, order_by = "id_ASC" }) => {
  const [campo, direccion] = order_by.split("_");
  const offset = (page - 1) * limits;

  const consulta = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    campo,
    direccion,
    limits,
    offset,
  );

  const { rows: joyas } = await pool.query(consulta);
  return joyas;
};

const obtenerJoyasFiltradas = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  let filtros = [];
  const valores = [];

  const agregarFiltro = (campo, comparador, valor) => {
    valores.push(valor);
    const posicion = valores.length;
    filtros.push(`${campo} ${comparador} $${posicion}`);
  };

  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  if (metal) agregarFiltro("metal", "=", metal);

  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    consulta += ` WHERE ${filtros.join(" AND ")}`;
  }

  const { rows: joyas } = await pool.query(consulta, valores);
  return joyas;
};

module.exports = { obtenerJoyas, obtenerJoyasFiltradas };
