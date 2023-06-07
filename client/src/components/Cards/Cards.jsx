//Bibliotecas
import { useEffect, useState } from 'react';
//Componentes
import Card from '../Card/Card';
//Estilos
import style from './Cards.module.css';

export default function Cards(props) {
  const { recipes, selectedDiet } = props;
  console.log(recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc');
  const [recetas, setRecetas] = useState(recipes);
  const [filteredRecipes, setFilteredRecipes] = useState(
    selectedDiet
      ? props.recipes.filter((recipe) =>
        recipe.diets.some((diet) => diet.name === selectedDiet)
      )
      : recipes
  );
  const pageSize = 9;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  useEffect(() => {
    if (recetas.length !== recipes.length) {
      setRecetas(recipes);
    }
    recipes.sort()
    setFilteredRecipes(
      selectedDiet
        ? recipes.filter((recipe) =>
          recipe.diets.some((diet) => diet === selectedDiet)
        )
        : recipes
    );
  }, [recetas, recipes, selectedDiet]);
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (endIndex < filteredRecipes.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleSort = (direction) => {
    const sortedRecipes = [...filteredRecipes].sort((a, b) => {
      if (direction === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredRecipes(sortedRecipes);
    setSortDirection(direction === 'asc' ? 'desc' : 'asc');
  };
  const handleOrigin = (origin) => {
    if (origin === "TODO") {
      setFilteredRecipes(recipes);
    }
    else {
      const newRecipes = recetas.filter((receta) =>
        receta.source === origin)
      setFilteredRecipes(newRecipes);
    }
  }
  return (
    <div className={style.DivCards}>
      <div>
        <button onClick={() => handleSort('asc')}>
          Ordenar Ascendente
        </button>
        <button onClick={() => handleSort('desc')}>
          Ordenar Descendente
        </button>
        <button onClick={() => handleOrigin("LOCAL")}>
          Local
        </button>
        <button onClick={() => handleOrigin("API")}>
          API
        </button>
        <button onClick={() => handleOrigin("TODO")}>
          TODO
        </button>
      </div>
      {filteredRecipes.slice(startIndex, endIndex).map((ele) => (
        <Card
          name={ele.name}
          id={ele.id}
          image={ele.image}
          diets={ele.diets}
          key={ele.id}
        />
      ))}
      <div className={style.buttons}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <h4>{currentPage}</h4>
        <button onClick={handleNextPage} disabled={endIndex >= filteredRecipes.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
