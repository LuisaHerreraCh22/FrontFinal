import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import crud from '../conexiones/crud';
import swal from "sweetalert";

const CrearCategoria = () => {
//funciones
const navigate=useNavigate();


const [categoria, setCategoria]= useState({
  nombre:'',
  imagen:'',

 
});

const {nombre,imagen}=categoria;

const onChange = (e)=>{
  setCategoria({
    ...categoria,//... sobreescribir en elmismo json lo que antes se estaba guardando en la caja
    [e.target.name]:e.target.value
  })

};

const IngresarCategoria = async ()=>{
//inicio de comentario
  // validacion campos obligatorios
if ((nombre).length===0 || (imagen).length===0){
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

}else{
//fin comentario
    const data={
    nombre:categoria.nombre,
    imagen:categoria.imagen   
  }
 // console.log(data);
  const response =await crud.POST(`/api/categorias`, data);
   const mensaje = response.mensaje;
   console.log(mensaje);
 
   const mensaje1 = "La categoria se creo correctamente";
      swal ({
        title:'Información',
        text: mensaje1,
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
            // redireccionar a la pagina de Admin
            navigate("/admin");
  
};
}// comentar
  
    
  const onSubmit=(e)=>{
    e.preventDefault();
    IngresarCategoria();
  }



//html
    return (
    
            <>
            <Header/>
            <div className="md:flex md:min-h-screen">
              <SideBar/>

              <main className="flex-1">
              <div className="mt-10 flex justify-center">
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  font-display text-5xl tracking-tight font-extrabold text-center py-2">
                        Crear Categoria
                </h1>

              </div>

              <div className="mt-1 flex justify-center">

              <form 
            onSubmit ={onSubmit}
            className="my-10 bg-white shadow rounded-lg p-10">
              <div className="my-5">

                <label className="uppercase text-gray-600 block text-1x font-bold">Nombre de la Categoria </label>
                  <input 
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="nombre de la categoria"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-indigo-600"
                  value={nombre}
                 onChange={onChange} 
                  />

                <label className="uppercase text-gray-600 block text-1x font-bold">Imagen de la Categoria </label>
                  <input 
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="imagen de la categoria"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-indigo-600"
                  value={imagen}
                 onChange={onChange} 
                  />

              </div>
              <input
                type="submit"
                value="Guardar Categoria"
                className="mb-5 w-full py-3 text-white uppercase font-bold rounded  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  transition duration-300 ease-in-out..."
                />

          
            </form>


              </div>

              </main>
              
              
            </div>
           
        
        
            </>
            
              );

    }

export default CrearCategoria ;
