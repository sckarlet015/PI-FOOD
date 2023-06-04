import Card from "../Card/Card";

export default function Search(props) {
    let receBuscada = props.receBuscada;
    const isArray = Array.isArray(receBuscada)
    if(isArray === false){
      receBuscada = [props.receBuscada]
    }
    console.log(receBuscada);
    return (
        <div>
            <h2>Recetas encontradas...</h2>
            {receBuscada?.length > 0 && receBuscada.map((rece) => (
                <Card
                    name={rece.name}
                    id={rece.apiID}
                    image={rece.image}
                    diets={rece.diets}
                    key={rece.id}
                />
            ))}
            {receBuscada?.length === 0 && <p>Sin datos encontrados</p>}
        </div>
    );
}
