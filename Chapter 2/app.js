//////////////////////////////////////////////////////////////////////
// Unknown Types
var userInput;
var userName;
userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput;
}
//////////////////////////////////////////////////////////////////////
// Never Type
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('An error occurred!', 500);
var result = generateError('An error occurred!', 500);
console.log(result);
