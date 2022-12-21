import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'; 
import swal from "sweetalert";
import crud from '../conexiones/crud';
const CrearCuenta = () => {

  const navigate=useNavigate();

  const [usuario, setUsuario]= useState({
  nombre:'',
  email:'',
  password:'',
  confirmar:''
});

const {nombre, email, password, confirmar }=usuario;

const onChange = (e)=>{
  setUsuario({
    ...usuario,
    [e.target.name]:e.target.value
  })

};



const CrearCuenta = async ()=>{
  // validacion campos obligatorios
  if ((nombre).length===0 || (email).length===0|| (password).length===0){
    console.log('diferentes');
    const mensaje = "todos los campos son obligatorios";
    swal ({
      title:'Error',
      text: mensaje,
      icon:'error',
      buttons:{
        confirm:{
          text:'OK',
          value: true,
        visible:true,
        className:'btn btn-danger',
        closeModal:true
        }
      }
    });
  }
  
  
  //los dos pasword deben ser iguales
  else if (password !== confirmar){
    console.log('diferentes');
    const mensaje = "las contraseñas son diferentes";
    swal ({
      title:'Error',
      text: mensaje,
      icon:'error',
      buttons:{
        confirm:{
          text:'OK',
          value: true,
        visible:true,
        className:'btn btn-danger',
        closeModal:true
        }
      }
    });
  }else{
    const data={
      nombre:usuario.nombre,
      email:usuario.email,
      password:usuario.password
    }
    console.log(data);
    const response =await crud.POST(`/api/usuarios`, data);
    const mensaje = response.mensaje;
    console.log(mensaje);

    if (mensaje==="usuario ya existe"){
      const mensaje = "El usuario ya existe";
    swal ({
      title:'Error',
      text: mensaje,
      icon:'error',
      buttons:{
        confirm:{
          text:'OK',
          value: true,
        visible:true,
        className:'btn btn-danger',
        closeModal:true
        }
      }
    });



    }else{
      const mensaje = "El usuario fue creado correctamente";
      swal ({
        title:'Información',
        text: mensaje,
        icon:'success',
        buttons:{
          confirm:{
            text:'OK',
            value: true,
          visible:true,
          className:'btn btn-primary',
          closeModal:true
          }
        }
      });
      setUsuario({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
      })
      // redireccionar a la pagina de login
      navigate("/login");

    };

  }
};

const onSubmit=(e)=>{
  e.preventDefault();
  CrearCuenta();
}

    return (
      <main className='container mx-auto mt-5 md:mt-15 p-5 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5'>
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  font-display text-5xl tracking-tight font-extrabold text-center py-5">
                Registrate
            </h1>
            <form 
             className="my- bg-white shadow rounded-lg p-10"
             onSubmit ={onSubmit}
              >
              <div className="my-5">
                
              <label className="uppercase text-gray-600 block text-1x font-bold">Nombre </label>
                  <input 
                  type="nombre"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese su nombre"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-blue-600"
                  value={nombre}
                  onChange={onChange}
                  />

                <label className="uppercase text-gray-600 block text-1x font-bold">Email </label>
                  <input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email de registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-blue-600 "
                  value={email}
                  onChange={onChange} 
                  />
                  <label className="uppercase text-gray-600 block text-1x font-bold">Password </label>
                  <input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password de registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-blue-600"
                  value={password}
                  onChange={onChange} 
                  />
                 <label className="uppercase text-gray-600 block text-1x font-bold">Confirmar Password </label>
                  <input 
                  type="password"
                  name="confirmar"
                  id="confirmar"
                  placeholder="Password de confirmación"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-blue-600"
                  value={confirmar}
                  onChange={onChange}
                  />



              </div>
              <input
                type="submit"
                value="Registrar Usuario"
                className="mb-5 w-full py-3 text-white uppercase font-bold rounded  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  transition duration-300 ease-in-out..."
                />

            <Link
 
            className="block text-center my-5"
            to={"/"}
            >
            Regresar
            </Link>
          
            </form>
        </div>
        

      </main>
 
    )

}

export default CrearCuenta;
