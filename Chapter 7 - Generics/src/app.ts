///////////////////////////////////////////////////////////////////////////////
// Generic Functions

// Un tipo genérico es un tipo que está conectado a otro tipo y es flexible en
// cuanto a qué otro tipo puede estar conectado a él
const names: Array<string> = ["Carlos Pineda"]; // string[]
names[0].split(" ");

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});

///////////////////////////////////////////////////////////////////////////////
// Creando un tipo genérico

// Una funcion que fusiona dos objetos
// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }
//
// const mergedObj = merge({ name: "Max" }, { age: 30 });
// console.log(mergedObj.age);
// const mergedObj = merge({ name: "Max" }, { age: 30 }) as {
//   name: string;
//   age: number;
// }; // Esto es un type casting

///////////////////////////////////////////////////////////////////////////////
// Trabajando con constraints

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);

///////////////////////////////////////////////////////////////////////////////
// Otra función genérica
interface Lengthy {
  length: number;
}

// el uso de esta interface nos ayuda a que el compilador sepa que el tipo que
// se le va a pasar a la función va a tener una propiedad length

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));

///////////////////////////////////////////////////////////////////////////////
// The "keyof" Constraint

// La palabra reservada keyof nos ayuda a definir que el objeto debe tener una
// propiedad con el nombre que se le pasa como parámetro a la función
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

///////////////////////////////////////////////////////////////////////////////
// Clases genéricas

// Es mejor hacerlo funcionar con tipos primitivos, ya que si lo hacemos con un
// objeto, este objeto puede no tener la referencia correcta
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.addItem("Manu");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Max" }; // De esta forma pasamos el mismo
// // elemento en memoria, esta seria la única forma de poder eliminarlo, ya que
// // referencia se mantiene
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "Manu" });
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

///////////////////////////////////////////////////////////////////////////////
// Generic Utility Types

interface CourseGoal {
  title: string,
  description: string,
  completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  // return {title: title, description: description, completeUntil: date};
  // Partial indica que al final el objeto será del tipo, Partial vuelve las
  // propiedades opcionales, pero al final se debe respetar la implementación
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  // Al final se debe hacer un typeCasting para que se complete el uso de
  // Partial
  return courseGoal as CourseGoal;
}

// const names1: Readonly<string[]> = ["Max", "Sports"];
// names1.push("Manu");
