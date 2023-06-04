//Bibliotecas
import React from "react";
import { NavLink } from "react-router-dom";
//Componentes
import SearchBar from "../NavBar/SearchBar";
//Estilos
import style from "./Nav.module.css"

export default function Nav(props) {
    return (
        <div className={style.NavBar}>
            <NavLink to={"/home"} className={style.link}>Inicio</NavLink>
            <NavLink to={"/Crear"} className={style.link}>Crear</NavLink>
            <SearchBar buscar={props.buscar}></SearchBar>
        </div>
    )
}