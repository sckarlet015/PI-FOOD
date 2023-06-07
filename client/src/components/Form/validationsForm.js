function contieneNumero(name) {
    return /\d/.test(name);
}
function contieneSimbolo(name) {
    return /[^\w\s]/.test(name);
}
function esUrl(image) {
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return regex.test(image);
}
function esNumeroEntero(num) {
    const numString = num.toString();
    const regex = /^\d+$/;
    return regex.test(numString);
}
export function validateRece(createRece) {
    const errors = {};
    if (createRece.name.length === 0) {
        errors.name = "El nombre no puede quedar vacio"
    }
    if (contieneNumero(createRece.name)) {
        errors.name = "No debe de incluir numeros"
    }
    if (contieneSimbolo(createRece.name)) {
        errors.name = "No debe de contener simbolos"
    }
    if (createRece.image.length === 0) {
        errors.image = "No puede quedar vacio"
    }
    if (!esUrl(createRece.image)) {
        errors.image = "Debe de ser una URL valida"
    }
    if (createRece.summary.length === 0) {
        errors.summary = "El resumen no puede quedar vacio"
    }
    if (createRece.steps.length === 0) {
        errors.steps = "La preparación no puede quedar vacia"
    }
    if (!createRece.healthScore) {
        errors.healthScore = "No puede quedar vacio"
    }
    if (!esNumeroEntero(createRece.healthScore)) {
        errors.healthScore = "Debe de ser un numero entero"
    }
    if(createRece.healthScore > 100){
        errors.healthScore = "El nivel de salud no puede ser mayor a 100"
    }
    if (createRece.diets.length < 1) {
        errors.diets = "Debes seleccionar por lo menos una dieta"
    }
    return errors;
}