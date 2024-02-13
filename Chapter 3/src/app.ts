const userName = 'Carlos Pineda';
console.log(userName);

const button = document.querySelector('button')! as HTMLButtonElement;

button.addEventListener('click', () => {
    console.log('Clicked');
})

// Additional Checks
/*
noUnusedLocals nos muestra una advertencia cuando declaramos una variable y no la usamos
noUnusedParameters nos muestra una advertencia cuando declaramos un parámetro y no lo usamos
noImplicitReturns nos muestra una advertencia cuando una función no tiene un return explícito
 */
