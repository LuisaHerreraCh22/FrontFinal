import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";
import crud from '../../conexiones/crud';
import swal from "sweetalert";

const ActualizarCategoria = () => {
//funciones
const navigate=useNavigate();


const { idCategoria}=useParams();
console.log(idCategoria);

const [categoria, setCategoria]=useState({
    nombre:'',
    imagen:''
})
const cargarCategoria =async()=>{
    const response = await crud.GET(`/api/categorias/${idCategoria}`);
   // console.log(response);
    setCategoria(response.categoria);
}
useEffect(()=>{
    cargarCategoria()
},[]);

//console.log(categoria);

const{nombre,imagen}=categoria;
const onChange=(e)=>{
setCategoria({
    ...categoria,
        [e.target.name]:e.target.value
    
})

};

const actualizarCategoria=async()=>{
    const data ={
        nombre:categoria.nombre,
        imagen:categoria.imagen
    }
    const response=await crud.PUT(`/api/categorias/${idCategoria}`,data);
    const mensaje ="Categoria actualizada con exito";
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
    
      navigate("/admin")
}
const onSubmit=(e)=>{
  e.preventDefault();
  actualizarCategoria();

}


//html
    return (
    
            <>
            <Header/>
            <div className="md:flex md:min-h-screen">
              <SideBar/>

              <main className="flex-1">
              <div className="mt-10 flex justify-center">
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  font-display text-5xl tracking-tight font-extrabold text-center py-3">
                        Actualizar Categoria
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
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-indigo-600 "
                  value={nombre}
                 onChange={onChange} 
                  />

                <label className="uppercase text-gray-600 block text-1x font-bold">Imagen de la Categoria </label>
                  <input 
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="imagen de la categoria"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 border-indigo-600 "
                  value={imagen}
                 onChange={onChange} 
                  />

              </div>
              <input
                type="submit"
                value="Actualizar Categoria"
                className="mb-5 w-full py-3 text-white uppercase font-bold rounded  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  transition duration-300 ease-in-out..."
                />

          
            </form>


              </div>

              </main>
              
              
            </div>
           
        
        
            </>
            
              );

    }

export default ActualizarCategoria ;
