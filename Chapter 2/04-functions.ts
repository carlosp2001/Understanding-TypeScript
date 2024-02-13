//////////////////////////////////////////////////////////////////////
// Retorno de funciones Tipos y void
function add(n1: number, n2: number): number {
    return n1 + n2;
}

function printResult(num: number) {
    console.log('Result: ' + num);
}

function printResult2(num: number): undefined {
    // Si especificamos undefined debemos colocar un return
    return;
}

printResult(add(5, 12));
printResult2(add(5, 12))

//////////////////////////////////////////////////////////////////////
// Funciones como tipos

// Function es el tipo de dato que se le asigna a una función
let combineValues: Function;
combineValues = add;
// combineValues = 5;

console.log(combineValues(8, 8));

// Function nos permite especificar la función que esperamos
let combineValues2: (a: number, b: number) => number;
console.log(combineValues2(8, 8));

//////////////////////////////////////////////////////////////////////
// Function Types and Callbacks

// En este ejemplo definimos una función que recibe dos números y una función, la función se ejecutará con el resultado de la suma de los dos números, la función cb debe contar con cierto tipo de dato, que sería un número y no debe devolver ningún otro valor
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

// Aquí definimos la función que se ejecutará con el resultado de la suma
addAndHandle(10, 20, (result) => {
    console.log(result);
});
