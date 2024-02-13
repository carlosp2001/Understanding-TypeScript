// Union Types
function combine(n1: number | string, n2: number | string) {
    let result;
    if (typeof n1 === 'number' && typeof n2 === 'number') {
        result = n1 + n2;
    } else {
        result = n1.toString() + n2.toString();
    }
    return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);

// Literal Types

function combine2(
    n1: number | string,
    n2: number | string,
    resultConversion: 'as-number' | 'as-text'
) {
    let result;
    if (typeof n1 === 'number' && typeof n2 === 'number' || resultConversion === 'as-number') {
        result = +n1 + +n2;
    } else {
        result = n1.toString() + n2.toString();
    }
    return result;
    // if (resultConversion === 'as-number') {
    //     return +result;
    // } else {
    //     return result.toString();
    // }
}

const combinedAges2 = combine2(30, 26, 'as-number');
console.log(combinedAges2);

const combinedStringAges = combine2('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames2 = combine2('Max', 'Anna', 'as-text');
console.log(combinedNames2);

// Type Aliases / Custom Types
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine3(
    n1: Combinable,
    n2: Combinable,
    resultConversion: ConversionDescriptor
) {
    let result;
    if (typeof n1 === 'number' && typeof n2 === 'number' || resultConversion === 'as-number') {
        result = +n1 + +n2;
    } else {
        result = n1.toString() + n2.toString();
    }
    return result;
}

