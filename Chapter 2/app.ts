//////////////////////////////////////////////////////////////////////
// Unknown Types

let userInput: unknown; // Similar a any pero más seguro, ya que no se puede asignar a otro tipo de dato
let userName: string;

userInput = 5;
userInput = 'Max';

// Primero debemos validar el tipo de dato que tiene userInput, de ser ese tipo de dato, asignamos el valor a userName
if (typeof userInput === 'string') {
    userName = userInput;
}

//////////////////////////////////////////////////////////////////////
// Never Type
// El tipo de dato never es un tipo de dato que nunca retorna un valor, es decir, nunca termina de ejecutarse
function generateError(message: string, code: number): never | string { // Se pueden especificar varios tipos de datos que retornará la función
    if (message.length < 5) return message;
    throw {message: message, errorCode: code};
}

generateError('An error occurred!', 500);

const result = generateError('An error occurred!', 500);
console.log(result);
