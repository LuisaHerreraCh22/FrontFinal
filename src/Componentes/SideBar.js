import React from "react";
import {Link} from "react-router-dom";


const SideBar = () => {
//funciones

//html
    return (
    <aside className="md:w-80 lg:w-60 px-5 py-10 bg-purple-400 rounded-tr-lg">

<div className="columns-1">



<div >       
<Link
 
 className="bg-gradient-to-r hover:from-lime-400 hover:to-indigo-400 from-sky-500 to-indigo-500 ... p-3 text-white uppercase font-bold mt-5 text-center rounded-lg w-full"
 to={"/crear-categoria"}
 >
 Crear categoria
 </Link>
 </div>

 <div className="py-10">
 <Link
 
 className="bg-gradient-to-r hover:from-lime-400 hover:to-indigo-400 from-sky-500 to-indigo-500 ... p-3 text-white uppercase font-bold mt-5 text-center rounded-lg w-full"
 to={"/admin"}
 >
 Categorias
 </Link>

 </div>

 </div>
    </aside>

    );

    }

export default SideBar ;
