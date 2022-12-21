import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import crud from "../conexiones/crud";
import Header from "./Header";
import SideBar from "./SideBar";
import swal from "sweetalert";

const Admin = () => {
//funciones
const navigate=useNavigate()

useEffect(()=>{
const autenticarUsuario=async()=>{
const token =localStorage.getItem('token')
//console.log(token)

if (!token){
  navigate("/login");
}

}
autenticarUsuario()

},[navigate]);// []significa que se ejecuta una sola vez cuando ingresa

const [categoria, setCategoria]=useState([]);


const cargarCategorias=async()=>{
const response = await crud.GET (`/api/categorias`);
console.log(response);
setCategoria(response.categoria);

}
useEffect(() => {

  cargarCategorias();

}, []);

const borrarCategoria=async(e, idCategoria)=>{


  swal({
    title: "Quiere eliminar esta categoria?",
    text: "Una vez eliminado, no podra recuperar esta categoria!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      e.preventDefault();
      const response =crud.DELETE(`/api/categorias/${idCategoria}`);
      //console.log(response.mensaje);
     // const mensaje=response.mensaje;
     
      if(response){
        swal("La categoria seleccionada fue eliminada correctamente!", {
          icon: "success",
        });
      }
      //cargarCategorias();
      setInterval("location.reload()",1000);
    
    } else {
      swal("Se cancelo la acción!");
    }
  });
  

}
const actualizarCategoria=async(idCategoria)=>{
  navigate (`/actualizar-categoria/${idCategoria}`)


}

const crearProductos = async (idCategoria)=>{
  navigate(`/home-productos/${idCategoria}`);
}

//html
    return (
    <>
    <Header/>
    <div className="md:flex md:min-h-screen">
      <SideBar/>
      <main className="flex-1">
      <div className="mt-10 flex justify-center">
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500  font-display text-5xl tracking-tight font-extrabold text-center py-5">
                Listado de categorias
            </h1>

      </div>
     
   
      <div className="mt-1 flex justify-center">
      <table className="border-collapse border border-slate-400 ...">
      <thead className="bg-indigo-400">
        <tr>
          <th className="border border-indigo-500 ... uppercase  p-4">Imagen</th>
          <th className="border border-indigo-500 ... uppercase p-4">Nombre</th>
          <th className="border border-indigo-500 ... uppercase p-6">Fecha de creación</th>
          <th className="border border-indigo-500 ... uppercase">Opciones</th>
        </tr>
      </thead>

      <tbody className="bg-indigo-200  border-indigo-500 ... ">
{
  categoria.map(
    item=>
    <tr key ={item._id}>
<td className="border  border-indigo-500 ... rounded-lg "><img src ={item.imagen} width ="150" heigth="150" className="rounded-lg m-5 border-4 border-indigo-600 border-double"></img> </td>
<td className="border  border-indigo-500 ... text-center">{item.nombre}</td>
<td className="border  border-indigo-500 ... text-center">{item.creado}</td>
<td className="border  border-indigo-500 ... text-center">
<input
                type="submit"
                value="Eliminar"
                className="bg-red-600 mb-5 w-48 py-2 text-white uppercase font-bold  hover:cursor-pointer hover:bg-red-300 transition-colors m-3 rounded-lg "
                onClick={(e)=>borrarCategoria(e,item._id)}
               />
<input
                type="submit"
                value="Actualizar"
                className="bg-violet-600 mb-5 w-48 py-2 text-white uppercase font-bold  hover:cursor-pointer hover:bg-violet-300 transition-colors m-3 rounded-lg"
                onClick={(e)=>actualizarCategoria(item._id)}
              />
               <input
                type="submit"
                value="Agregar Producto"
                className="bg-sky-600 mb-5 w-48 py-2 text-white uppercase font-bold  hover:cursor-pointer hover:bg-sky-300 transition-colors m-3 rounded-lg"
                onClick={(e)=>crearProductos(item._id)}
               />
</td>
    </tr>
  )
}

      </tbody>

    </table>



      </div>

      </main>

      </div>
   
    </>
    
      );

    }

export default Admin;
