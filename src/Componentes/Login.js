import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'; 
import crud from '../conexiones/crud';
import swal from "sweetalert";

const Login = () => {

  const navigate=useNavigate();

//funciones
const [usuario, setUsuario]= useState({
  email:'',
  password:'',
 
});

const {email, password}=usuario;

const onChange = (e)=>{
  setUsuario({
    ...usuario,
    [e.target.name]:e.target.value
  })

};


const IngresarCuenta = async ()=>{
  const data={

  email:usuario.email,
  password:usuario.password
  
}
console.log(data);
const response =await crud.POST(`/api/auth`, data);
   const mensaje = response.mensaje;
   console.log(mensaje);


   if (mensaje==="el usuario no existe"){
    const mensaje = "El usuario no existe";
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


   }else if (mensaje==="password incorrecto") {
    const mensaje = "Password incorrecto";
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
  

   } else {
    const jwt = response.token;
    //guardar la informacion en el local storage
    localStorage.setItem('token', jwt);


 navigate("/admin");

    
   }
    };

  
const onSubmit=(e)=>{
  e.preventDefault();
  IngresarCuenta();
}


//html
    return (
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5'>
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  font-display text-5xl tracking-tight font-extrabold text-center">
                Iniciar Sesión 
            </h1>
            <form 
            onSubmit ={onSubmit}
            className="my-10 bg-white shadow rounded-lg p-10">
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-1x font-bold">Email </label>
                  <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email de registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-indigo-600 "
                  value={email}
                  onChange={onChange} 
                  />
                    <label className="uppercase text-gray-600 block text-1x font-bold">Password </label>
                  <input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password de registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-indigo-600"
                  value={password}
                  onChange={onChange} 
                  />

              </div>
              <input
                type="submit"
                value="Iniciar Sesión"
                className="mb-5 w-full py-3 text-white uppercase font-bold rounded  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  transition duration-300 ease-in-out..."
                
                />

            <Link
 
            className="block text-center my-5 mb-5 w-full py-3 text-white uppercase font-bold rounded  bg-fuchsia-500 hover:-translate-y-1 hover:scale-110 hover:bg-purple-400  transition duration-300 ease-in-out..."
            to={"/crear-cuenta"}
            >
            Crear cuenta
            </Link>
          
            </form>
        </div>
        

      </main>

    );

    }

export default Login;
