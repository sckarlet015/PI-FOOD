//Funciones
import axios from "axios"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
//Acciones
import { getAllDiets } from './redux/actions/getAllDiets';
//Componentes
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Recetas from './components/Recetas/Recetas';
import Search from './components/Search/Search'
import Detail from './components/detail/Detail';
import Form from './components/Form/Form';
//Estilos
import './App.css';

function App() {

  const allDiets = useSelector(state => state.allDiets);
  const isLoading = useSelector(state => state.isLoading);
  const [receBuscada, setReceBuscada] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  async function buscar(inputValue) {
    try {
      console.log("se inicia función buscar");
      // Validar si es solo letras
      if (/^[a-zA-Z]+$/.test(inputValue)) {
        let recet = await axios(`http://localhost:3001/recipes/name?name=${inputValue}`)
          .then(response => response.data)
          .then(data => data)
        setReceBuscada(recet)
        console.log(recet);
      }
      // Validar si es solo numeros
      else if (/^\d+$/.test(inputValue)) {
        let recet = await axios(`http://localhost:3001/recipes/${inputValue}`)
          .then(response => response.data)
          .then(data => data)
        console.log(recet);
        setReceBuscada(recet)
        console.log(recet);
      }
      else {
        alert("Valor nulo, asegurate de no mezclar letras con numeros")
      }
    } catch (error) {
      alert("La receta no existe")
    }
  }

  useEffect(() => {
    if (allDiets.length === 0 && !isLoading) {
      dispatch(getAllDiets());
    }
  }, [allDiets, isLoading, dispatch]);

  function handleClick() {
    navigate("/home")
  }
  return (
    <div className="App">
      {location.pathname !== '/' && <Nav buscar={buscar} />}
      <Routes>
        <Route
          path='/'
          element={<Home entrar={handleClick} />}
        />
        <Route
          path='/home'
          element={<Recetas />}
        />
        <Route
          path='/search'
          element={<Search receBuscada={receBuscada} />}
        />
        <Route
          path='/detail/:recetaId'
          element={<Detail />}
        />
        <Route
          path='/crear'
          element={<Form allDiets={allDiets} />}
        />
      </Routes>
    </div>
  );
}

export default App;
