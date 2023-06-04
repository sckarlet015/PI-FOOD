import { useEffect, useState } from "react";
import { validatePoke } from "./validationsForm";
import { useSelector, useDispatch } from 'react-redux';
import postRecipe from "../../redux/actions/postRecipe";
import style from "./Form.module.css";
import axios from "axios";

export default function Form(props) {

    const dispatch = useDispatch();
    const [createRece, setCreateRece] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
    });
    const initialState = {
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
    };
    const resetForm = () => {
        setCreateRece(initialState);
        setErrors({});
    };

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

    const handlePostRece = async () => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (hasErrors) {
            alert("Lo sentimos, aún hay errores. Por favor, revisa los datos e inténtalo nuevamente.");
            return;
        }
        dispatch(postRecipe(createRece))
            resetForm();
    };

    return (
        <div className={style.form}>
            <h3>Crea tu Receta</h3>
            <div>
                <div className={style.conten}>
                    <span className={style.title}>Imagen: </span>
                    <input className={style.inp} name="image" value={createRece.image} onChange={handleInputChange} placeholder="URL de la imagen del pokemon."></input>
                    <p className={style.danger}>{errors.image}</p>
                    <img src={createRece.image} alt="imagen del pokemon" className={style.imagen} />
                </div>
                <div className={style.conten}>
                    <span className={style.title}>Nombre: </span>
                    <input className={style.inp} name="name" value={createRece.name} onChange={handleInputChange} placeholder="Solo letras sin números."></input>
                    <p className={style.danger}>{errors.name}</p>
                    <span className={style.title}>Resumen: </span>
                    <textarea className={style.inp} name="summary" value={createRece.summary} onChange={handleInputChange} placeholder="Resumen del platillo..." rows={9} cols={50}></textarea>
                    <p className={style.danger}>{errors.summary}</p>
                </div>
            </div>
            <div className={style.conten2}>
                <span className={style.title}>Preparación: </span>
                <textarea className={style.inp} name="steps" value={createRece.steps} onChange={handleInputChange} placeholder="Preparación del platillo..." rows={6} cols={80}></textarea>
                <p className={style.danger}>{errors.steps}</p>
            </div>
            <div className={style.conten2}>
                <span className={style.title}>Puntuación: </span>
                <input className={style.inp} name="healthScore" value={createRece.healthScore} onChange={handleInputChange} placeholder="Solo numeros de 1 a 99."></input>
                <p className={style.danger}>{errors.healthScore}</p>
                <div className={style.types}>
                    <span className={style.title}>Dietas: </span>
                    <div className={style.dietas}>
                        {props.allDiets.map((opcion) => (
                            <div key={opcion.id}> {/* Utiliza el identificador único como clave */}
                                <input
                                    type="checkbox"
                                    id={opcion.id}
                                    name={opcion.name}
                                    onChange={() => manejarCambio(opcion.name)}
                                />
                                <label className={style.dieta} htmlFor={opcion.name}>{opcion.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {Object.values(errors).some((error) => error !== "") ? (
                <p className={style.error}>
                    Lo sentimos, aún hay errores. Por favor, revisa los datos e inténtalo nuevamente.
                </p>
            ) : (
                <button className={style.crear} onClick={handlePostRece}>
                    Crear
                </button>
            )}
        </div>
    );
}
