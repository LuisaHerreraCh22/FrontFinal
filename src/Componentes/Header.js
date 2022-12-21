
import {useNavigate} from "react-router-dom";
import React from "react";


const Header = () => {
//funciones
const navigate=useNavigate();

const cerrarSesion=()=>{
    localStorage.removeItem("token");
    navigate("/");
  
  }

//html
    return (
        <header className="px-4 py-5 bg-lime-200 border-b">
            <div className="md:flex md: justify-between">
                <h2 className="text-4xl text-violet-600 font-black  mb-5 :mb-0">
                    Bienvenido 
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                <input
                type="submit"
                value="Cerrar Sesión"
                className="bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500 ... p-3 text-white uppercase font-bold mt-5 text-center rounded-lg"
               onClick={cerrarSesion}
               />
                </div>

            </div>

        </header>

 


    );

    }

export default Header;
