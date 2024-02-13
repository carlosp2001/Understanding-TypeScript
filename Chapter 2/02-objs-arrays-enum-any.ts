// const person: {
//     name: string;
//     age: number
// } = {
/////////////////////////////////////////////////////////
// Objects
const person = {
    name: "Maximilian",
    age: 30,
    hobbies: ['Sports', 'Cooking']
};

/////////////////////////////////////////////////////////
// Arrays
let favoriteActivities: string[];
favoriteActivities = ['Sports'];

// Si queremos que el array tenga strings o numeros
let favoriteActivities2: any[];
favoriteActivities2 = ['Sports', 1];

console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

/////////////////////////////////////////////////////////
// Tuples
const person2 : {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string] // Tuple
} = {
    name: "Maximilian",
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};

person2.role.push('admin'); // Esto será permitido
// person2.role[1] = 10; // Esto no porque el segundo elemento debe ser un string

let favoriteActivities3: string[];
favoriteActivities3 = ['Sports'];

/////////////////////////////////////////////////////////
// Enums

// enum Role { ADMIN="ADMIN", READ_ONLY="READ_ONLY", AUTHOR="AUTHOR" };
// Podemos darle un valor a cada elemento del enum

enum Role { ADMIN, READ_ONLY, AUTHOR }; // El valor por default será 0, 1, 2, etc.

const person3 = {
    name: "Maximilian",
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

if (person3.role === Role.ADMIN) {
    console.log(person3.role);
    console.log('is admin');
}

/////////////////////////////////////////////////////////
// Any

let favoriteActivities4: any[]; // Podria almacenar cualquier tipo de dato
favoriteActivities4 = ['Sports', 1];
