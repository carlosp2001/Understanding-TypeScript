// Esta es una clase abstracta, no se puede instanciar, solo se puede heredar
abstract class Department {
    // Propiedades estaticas son accesibles sin necesidad de instanciar la clase
    static fiscalYear = 2020;
    // public name: string; // El valor default de una propiedad es public
    // Podemos convertir una propiedad en privada, para que solo sea accesible dentro de la clase
    // private employees: string[] = [];

    // Podemos convertir una propiedad en protegida, para que solo sea accesible dentro de la clase y sus subclases
    protected employees: string[] = [];

    // Sin necesidad de definir las propiedades en la clase podemos hacerlo en el constructor,
    // agregando el modificador de acceso que queramos
    // Readonly nos permite definir una propiedad que solo puede ser leida, pero no modificada
    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
        console.log(Department.fiscalYear);
    }

    static createEmployee (name: string) {
        return {name: name};
    }

    describe(this: Department) {
        console.log('Department: ' + this.name);
    }

    // Para implementar un método abstracto, la clase debe ser abstracta
    abstract describeDetails(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

// const accounting = new Department('d1', 'Accounting');
// console.log(accounting);
// accounting.describe();
//
// const accountingCopy = {describe: accounting.describe};
//
// // Si no le asignamos un valor especifico a this, el compilador de TS nos va a dar un error
// // accountingCopy.describe(accounting); // this is undefined
//
// accounting.addEmployee('Max');
// accounting.addEmployee('Manu');
// accounting.name = "NEW NAME";
// accounting.describe();
// accounting.printEmployeeInformation();

/////////////////////////////////////////////////////////////////////////////////////
// Herencia

// Podemos heredar de una clase con la palabra reservada extends
class ITDepartment extends Department {
    // Si no especificamos un constructor en la clase hija, se va a usar el constructor de la clase padre
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    printAdminInformation() {
        console.log(this.admins);
    }

    // Este método debe especificarse en la clase hija, ya que es abstracto en la clase padre
    describeDetails() {
        console.log('ID: ' + this.id);
    }
}

const accountingIT = new ITDepartment('d2', ['Max']);

accountingIT.addEmployee('Carlos');
accountingIT.addEmployee('Manu');
accountingIT.describe();
accountingIT.printEmployeeInformation();
accountingIT.printAdminInformation();

class AccountingDepartment extends Department {
    private lastReport: string;

    // Esta propiedad es estática nos ayuda a poder conocer si una instancia ha sido ya creada, la idea es que solo
    // exista una instancia de esta clase
    private static instance: AccountingDepartment;

    // Un getter nos permite obtener el valor de una propiedad privada
    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error('No report found.');
    }


    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    // Al hacer privado el constructor solo tenemos acceso a él dentro de la clase
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    // Este es el método que nos ayuda a retornar la intancia si no ha sido creada, o retornar la instancia ya creada
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return  this.instance;
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    describeDetails() {
        console.log('ID: ' + this.id);
    }
}

// const accountingDepartment = new AccountingDepartment('d2', []);
const accountingDepartment = AccountingDepartment.getInstance();
accountingDepartment.mostRecentReport = 'Year End Report'; // Usamos el setter
console.log(accountingDepartment.mostRecentReport); // Usamos el getter

// Mostramos que solo existe una instancia de la clase
console.log(accountingDepartment);

accountingDepartment.addReport('Something went wrong...');
accountingDepartment.addEmployee('Max');
accountingDepartment.addEmployee('Manu');
accountingDepartment.printReports();
accountingDepartment.printEmployeeInformation();

// Usando métodos estáticos
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);
