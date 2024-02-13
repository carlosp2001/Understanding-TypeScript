// Interfaces son exclusivas de TypeScript, no existen en JavaScript, nos ayudan a definir la estructura de un objeto
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}

let user1: Person;
user1 = {
    name: 'Carlos',
    age: 30,
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
};

user1.greet('Hi there - I am');

// Usando interfaces con clases
// Una interface sirve para definir la estructura de un objeto, pero no puede ser instanciada
interface Greetable {
    // Read only nos permite definir una propiedad que solo puede ser leida, pero no modificada
    readonly name: string;

    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age = 30;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}

let user2: Greetable;
user2 = new Person('Carlos');
user2.greet('Hi There I am');

// Extendiendo interfaces
interface Greetable1 {
    // Read only nos permite definir una propiedad que solo puede ser leida, pero no modificada
    greet(phrase: string): void;
}

// De esta forma extendemos la interface Greetable1 para que herede sus propiedades
interface Named1 extends Greetable1 {
    readonly name: string;
}

// Interfaces como tipos de funciones
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
};

interface AddFn1 {
    (a: number, b: number): number;
}

let add1: AddFn1;

add1 = (n1: number, n2: number) => {
    return n1 + n2;
};

// Parámetros opcionales y propiedades opcionales
interface Named2 {
    readonly name?: string;
    outputName?: string;
}

interface Greetable1 extends Named2 {
    // Read only nos permite definir una propiedad que solo puede ser leida, pero no modificada
    greet(phrase: string): void;
}

class Person1 implements Named2 {
    // Podemos hacer que la propiedad name sea opcional agregando el signo de interrogación
    name?: string;
    age = 30;

    // También podemos hacer que un parámetro sea opcional agregando el signo de interrogación en el constructor
    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}
