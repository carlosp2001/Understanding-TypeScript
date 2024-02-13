///////////////////////////////////////////////////////////////////////////////
// Decoradores (Decorators)

// Primera clase de decoradores
// Al final los decoradores son funciones que se ejecutan cuando una clase es
// definida

// Decorador, los decoradores reciben un argumento, que es la clase a la que se
// le va a aplicar
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

// Dato interesante, los decoradores se ejecutan cuando la clase es definida, no
// cuando es instanciada
@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);

///////////////////////////////////////////////////////////////////////////////
// Trabajando con decoradores de fábrica
function Logger1(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// Construyendo decoradores más útiles
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// @Logger1('LOGGING - PERSON')
// El order de los decoradores es importante, ya que se ejecutan de abajo hacia
@Logger1("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person1 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

///////////////////////////////////////////////////////////////////////////////
// Decorador de propiedades
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

// El acceso a los decoradores de propiedades es diferente a los de clases, ya
// que no se ejecutan cuando la clase es definida, sino cuando la propiedad es
// definida
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log // Decorador de propiedad
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

///////////////////////////////////////////////////////////////////////////////
// Accesores de decoradores
