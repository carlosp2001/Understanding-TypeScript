/////////////////////////////////////////////////////////////////////////////////////
// Tipos de intesección, es decir, que un objeto cumpla con dos interfaces

type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
};
// Esto es una intersección de tipos, nos permite combinar dos tipos de objetos
type ElevatedEmployee = Admin & Employee;

// Esto es una unión de tipos, nos permite definir que un objeto puede ser de un tipo u otro
const e1: ElevatedEmployee = {
    name: 'Carlos',
    privileges: ['create-server'],
    startDate: new Date()
};

// Podemos usar interfaces para definir tipos de objetos
interface Admin1 {
    name: string;
    privileges: string[];
}

interface Employee1 {
    name: string;
    startDate: Date;
};

interface ElevatedEmployee1 extends Admin1, Employee1 {
}


type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // Esto es una intersección de tipos

/////////////////////////////////////////////////////////////////////////////////////
// Tipos de guardia

function add(a: Combinable, b: Combinable) {
    // Podemos usar typeof para saber que tipo de variable es
    if (typeof a === 'string' || typeof b === 'string') { // Esta condicional es un tipo de guardia
        return a.toString() + b.toString();
    }

    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);

    // Podemos usar in para saber si un objeto tiene una propiedad
    if ('privileges' in emp) { // Esta condicional es un tipo de guardia
        console.log('Privileges: ' + emp.privileges);
    }

    if ('startDate' in emp) { // Esta condicional es un tipo de guardia
        console.log('Start Date: ' + emp.startDate);
    }
}

printEmployeeInformation({name: 'Manu', startDate: new Date()});

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    // Podemos usar instanceof para saber si un objeto es de una clase en específico
    if (vehicle instanceof Truck) { // Esta condicional es un tipo de guardia
        vehicle.loadCargo(1000);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Uniones discriminadas

// Las uniones discriminadas nos permiten usar un tipo de guardia para saber que tipo de objeto es

interface Bird {
    type: 'bird'; // Esta propiedad es la que nos permite saber que tipo de objeto es, es decir, es una 'etiqueta
    flyingSpeed: number;
}

interface Horse {
    type: 'horse'; // Esta propiedad es la que nos permite saber que tipo de objeto es, es decir, es una 'etiqueta
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    // Podemos usar in para saber si un objeto tiene una propiedad
    let speed;

    switch (animal.type) { // Esta condicional es un tipo de guardia
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }

    console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Type Casting

// Si no colocamos el tipo de elemento que queremos obtener, TS va a asumir que es un elemento de HTML y no sabrá
// específicamente que elemento es, si es párrafo, un div, etc.
const paragraph = document.querySelector('p'); // Esto devuelve un elemento de HTML

// 1era fomra de hacer type casting
// const userInputElement = <HTMLInputElement>document.getElementById('user-input');
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

// Si por algún motivo el elemento puede ser nulo, podemos hacer lo siguiente
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hi there!';
}

// Esto no será permitido porque TypeScript no sabe que elemento estamos esperando
// userInputElement.value = 'Hi there!';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Index Properties

interface ErrorContainer {
    // {}
    // id: number;
    [prop: string]: string; // Esto nos permite definir que el objeto puede tener cualquier propiedad, pero que todas
    // las propiedades deben ser de tipo string, esto quiere decir que deben el nombre de las propiedades deben ser
    // strings y el valor de las propiedades también deben ser strings
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sobrecarga de funciones / Overload Functions

function processData(input: string, isUpperCase: boolean): string;
function processData(input: number, isUpperCase: boolean): string;  // Sobrecarga específica para números
function processData(input: Combinable, isUpperCase: boolean): string;

// Implementación de las sobrecargas
function processData(input: Combinable, isUpperCase: boolean = false) {
    if (typeof input === 'string') {
        if (isUpperCase) {
            return input.toUpperCase();
        } else {
            return input.toLowerCase();
        }
    }
    if (isUpperCase) {
        return input.toString().toUpperCase();
    } else {
        return input.toString().toLowerCase();
    }
}

// Uso de las funciones sobrecargadas
console.log(processData("Hello", false)); // Salida: "hello"
console.log(processData("Hello", true)); // Salida: "HELLO"
// Esto lanzará un error en tiempo de compilación:
// Argument of type 'number' is not assignable to parameter of type 'string'.
// console.log(processData(42));
console.log(processData(45, true)); // Salida: true

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Optional chaining

const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: {title: 'CEO', description: 'My own company'}
};

console.log(fetchedUserData?.job?.title);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Nullish Coalescing

const userInput = null;
const storedData = userInput ?? 'DEFAULT'; // Esto es como un operador ternario, si userInput es null o undefined,
// a diferencia del operador ||, el operador ?? no va a devolver el valor de la izquierda, sino que va a devolver el
// valor de la derecha, en este caso 'DEFAULT', solo funciona con valores null o undefined a diferencia del operador ||
// que funciona con valores falsy

