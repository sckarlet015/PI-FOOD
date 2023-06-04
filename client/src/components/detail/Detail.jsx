import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Detail.module.css";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [receta, setReceta] = useState([]);
  const [promise, setPromise] = useState([]);
  const { recetaId } = useParams();

  useEffect(() => {
    axios(`http://localhost:3001/recipes/${recetaId}`)
    .then(response => response.data)
    .then(data => setReceta([data]))
  },[recetaId]);

  console.log(receta);

  return (
    <div className={style.card}>
      <h2>
        {receta[0]?.name
          ? receta[0].name.charAt(0).toUpperCase() + receta[0].name.slice(1)
          : "Cargando..."}
      </h2>
      <div className={style.cont}>
        <div className={style.resumen}>
          <div>
            <h3>Receta ID: {receta[0]?.apiID}</h3>
            <img src={receta[0]?.image} alt="Receta" />
            {receta[0]?.diets?.length ? (
              receta[0].diets.map((ele, index) => (
                <span className={style.dietas} key={`${ele}-${index}`}>{ele}</span>
              ))
            ) : (
              <span>Cargando dietas...</span>
            )}
          </div>
          <div>
            <h2 className={style.name}>Resumen</h2>
            <p dangerouslySetInnerHTML={{ __html: receta[0]?.summary }}></p>
            <span>Nivel de salud: {receta[0]?.healthScore}</span>
            <div>
              <h2 className={style.name}>Preparación</h2>
              <p dangerouslySetInnerHTML={{ __html: receta[0]?.steps }}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
