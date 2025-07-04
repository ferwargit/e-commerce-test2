function ListaProductos({ productos }) {
  return (
    <ul>
      {productos.map((producto) => (
        <li key={producto}>{producto}</li>
      ))}
    </ul>
  );
}

export default ListaProductos;
