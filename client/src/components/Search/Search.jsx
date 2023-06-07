//Componentes
import Card from "../Card/Card";

export default function Search(props) {
    let receBuscada = props.receBuscada;
    const isArray = Array.isArray(receBuscada)
    if(isArray === false){
      receBuscada = [props.receBuscada]
    }
    return (
        <div>
            <h2>Resultados...</h2>
            {receBuscada?.length > 0 && receBuscada.map((rece) => (
                <Card
                    name={rece.name}
                    id={rece.apiID}
                    image={rece.image}
                    diets={rece.diets}
                    key={rece.id}
                />
            ))}
            {receBuscada?.length === 0 && <p>No se encontraron recetas</p>}
        </div>
    );
}
