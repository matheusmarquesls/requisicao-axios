import { useEffect, useState } from "react";
import { api } from "../provider/api";

function Home() {
 
  // const [usuario, setUsuario] = useState({
  //   nome: "matheus",
  // });

  const [listarUsuario, setListarUsuario] = useState([]);

  useEffect(() => {
    exibir();
  }, []);
  
  // function Cadastrar(){
  //   api.post("/usuarios", usuario)

  // }
  const cadastrar = () => {
    api.post(`/usuarios`, {
      
      nome: "matheuss",
      idade: 22,
      telefone: "99999999",
      
    }).then((response) => {
      console.log(response.data);
      exibir();
    }).catch((error) => {
      console.error("Erro ao cadastrar usuário:", error);
      
    })
  }



  const exibir = () => {
    api.get("/usuarios").then((response) => {
      setListarUsuario(response.data);
    });
  }




  
  
  const editar = (id) => {
    // Use PATCH para atualizar parcialmente sem alterar o id
    api.patch(`/usuarios/${id}`, {
      nome: "mariana",
      idade: 23,
      telefone: "111111111",
    })
      .then((response) => {
        console.log(response.data);
        exibir();
      })
      .catch((error) => {
        console.error("Erro ao editar usuário:", error);
      });
  }

  const deletar = (id) => {
    api.delete(`/usuarios/${id}`)
    .then((response) => {
      console.log(response.data);
      exibir();
    }).catch((error) => {
      console.error("Erro ao deletar usuário:", error);
    })
  }


  return (
    <>
    {listarUsuario.map((usuario) => (
      <div key={usuario.id}>
        <h1>{usuario.nome}</h1>
        <button onClick={() => editar(usuario.id)}>Editar</button>
        <button onClick={() => deletar(usuario.id)}>Deletar</button>
      </div>
    ))}

  <button onClick={cadastrar}>Cadastrar</button>
     </>
    
  );
}
export default Home;