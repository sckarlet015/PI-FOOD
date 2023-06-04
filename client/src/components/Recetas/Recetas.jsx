//Funciones
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Acciones
import { getAllDiets } from '../../redux/actions/getAllDiets';
import { getAllRecipes } from '../../redux/actions/getAllRecipes';
//Componentes
import Cards from "../Cards/Cards";
//Estilos
import style from "./Recetas.module.css"

export default function Recetas() {
  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.allRecipes);
  const allDiets = useSelector(state => state.allDiets);
  const isLoading = useSelector(state => state.isLoading);
  const [recipes, setRecipes] = useState([]);
  const [diets, setDiets] = useState([]);
  useEffect(() => {
    if (allRecipes.length === 0 && !isLoading) {
      dispatch(getAllRecipes());
      dispatch(getAllDiets());
    }
  }, [allRecipes, isLoading, dispatch]);
  useEffect(() => {
    if (!isLoading) {
      setRecipes(allRecipes);
      setDiets(allDiets)
    }
  }, [allRecipes, isLoading, allDiets]);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);
  const handleShowAllCards = () => {
    setShowAllCards(true);
    setSelectedDiet(null);
  };
  return (
    <div className={style.conteiner}>
      <div className={style.dietas}>
        <h2 className={style.h2Dieta}>Dietas</h2>
        <h3 className={style.dieta} onClick={handleShowAllCards}>
          Todo
        </h3>
        {diets?.length < 1 && <div><h4>Cargando dietas...</h4></div>}
        {diets.map((ele) => (
          <div
            key={ele.id}
            className={style.dieta}
            onClick={() => setSelectedDiet(ele.name)}
          >
            <h3>{ele.name}</h3>
          </div>
        ))}
      </div>
      <div className={style.recetas}>
        <h2 className={style.h2Receta}>Recetas</h2>
        {isLoading ? (
          <p>Cargando recetas...</p>
        ) : (
          <Cards recipes={recipes} selectedDiet={selectedDiet} />
        )}
      </div>
    </div>
  );
}