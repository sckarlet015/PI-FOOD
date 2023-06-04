import style from './SearchBar.module.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function SearchBar(props) {
   // Estado local
   const [nameOid, setNameOid] = useState([]);
   //Función que ejecuta la busqueda del personaje
   const handleChance = (e) => {
      const { value } = e.target;
      setNameOid(value)
      console.log(value);
   }

   return (
      <div className={style.search}>
         <input
            className={style.inp}
            type='search'
            onChange={handleChance}
            placeholder="Id o nombre..."
         />
         <NavLink to={"/search"}>
            <button 
            className={style.btn}
            onClick={()=>props.buscar(nameOid)}
            >Buscar</button>
         </NavLink>
      </div>
   );
}
