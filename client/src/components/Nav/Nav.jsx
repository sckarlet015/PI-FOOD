import React from "react";
import SearchBar from "../NavBar/SearchBar";
import style from "./Nav.module.css"
// import About from "../About/About";
import { NavLink } from "react-router-dom";

export default function Nav(props) {

    return (
        <div className={style.NavBar}>
            <NavLink to={"/home"} className={style.link}>Inicio</NavLink>
            <NavLink to={"/Crear"} className={style.link}>Crear</NavLink>
            <NavLink to={"/Acerca"} className={style.link}>Acerca</NavLink>
            <SearchBar buscar={props.buscar}></SearchBar>
        </div>
    )
}