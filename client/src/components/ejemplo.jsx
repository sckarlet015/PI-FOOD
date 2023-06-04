import { useEffect, useState } from "react";
import { validatePoke } from "./validationsForm";
import style from "./Form.module.css";
import axios from "axios";

export default function Form(props) {
    const [createRece, setCreateRece] = useState({
        name: "",
        id: "",
        image: "",
        summary: "",
        healthScore: null,
        steps: "",
        diets: [],
        source: "LOCAL",
    });
    const [seleccionados, setSeleccionados] = useState(0);
    const [errors, setErrors] = useState({});

    const manejarCambio = (opcion) => {
        if (seleccionados === 0) {
            setCreateRece((prevCreateRece) => ({
                ...prevCreateRece,
                diets: [...prevCreateRece.diets, opcion],
            }));
            setErrors((prevErrors) =>
                validatePoke({ ...createRece, diets: opcion })
            );
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateRece((prevCreateRece) => ({
            ...prevCreateRece,
            [name]: value,
        }));
        setErrors((prevErrors) => validatePoke({ ...createRece, [name]: value }));
    };

    const handlePostPoke = async () => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (hasErrors) {
            alert("Lo sentimos, aún hay errores. Por favor, revisa los datos e inténtalo nuevamente.");
            return;
        }

        try {
            await axios.post("http://localhost:3001/pokemons/post", createRece);
            alert(`Pokemon ${createRece.name} creado con éxito.`);
        } catch (error) {
            alert("¡Ups!... Algo falló, inténtalo de nuevo.");
        }
    };

    return (
        <div className={style.form}>
            <h3>Crea tu Pokemon</h3>
            <span className={style.title}>Nombre: </span>
            <input
                className={style.inp}
                name="name"
                value={createRece.name}
                onChange={handleInputChange}
                placeholder="Solo letras sin números."
            ></input>
            <p className={style.danger}>{errors.name}</p>
            <span className={style.title}>Imagen: </span>
            <input className={style.inp} name="image" value={createRece.image} onChange={handleInputChange} placeholder="URL de la imagen del pokemon."></input>
            <p className={style.danger}>{errors.image}</p>
            <img src={createRece.image} alt="imagen del pokemon" className={style.imagen} />
            <span className={style.title}>Vida: </span>
            <input className={style.inp} name="healthScore" value={createRece.healthScore} onChange={handleInputChange} placeholder="Solo numeros de 1 a 99."></input>
            <p className={style.danger}>{errors.healthScore}</p>
            <span className={style.title}>Ataque: </span>
            <input className={style.inp} name="steps" value={createRece.steps} onChange={handleInputChange} placeholder="Solo numeros de 1 a 99."></input>
            <p className={style.danger}>{errors.steps}</p>
            <div className={style.types}>
                {props.allDiets.map((opcion) => (
                    <div key={opcion.nombre}>
                        <input
                            type="checkbox"
                            id={opcion.id}
                            name={opcion.nombre}
                            onChange={() => manejarCambio(opcion.nombre)}
                        />
                        <label htmlFor={opcion.nombre}>{opcion.nombre}</label>
                    </div>
                ))}
                {/* <p className={style.danger}>{errors.tipo1}</p> */}
            </div>
            <button className={style.crear} onClick={handlePostPoke}>
                Crear
            </button>
        </div>
    );
}
