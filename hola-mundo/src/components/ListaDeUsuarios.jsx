function ListaDeUsuarios() {  
    const usuarios = ['Ana', 'Luis', 'Pedro', 'María'];  
    return (  
        <ul>  
            {usuarios.map(usuario => (  
                <li key={usuario}>{usuario}</li>  
            ))}  
        </ul>  
    );  
}

export default ListaDeUsuarios;