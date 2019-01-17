const messages = {
    isEmail: 'Email is invalid',
    isPassword: 'Password is invalid',
    isNumber: 'Please enter a value greater than one',
    isLettter: 'invalid text onlylll'
}

const rules = {

    testEmail: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
    letter: /[a-zA-Z0-9\s]{3,50}$/,
    passwordRegex: /^[a-zA-Z0-9\s]\w{3,14}$/,
    imageUrlRegex: /(https?:\/\/.*\.(?:png|jpg))/,
    number: /^[1-9][0-9]*$/
}


const validate = (message,rules,value) => {
    if(!rules.test(value)){
        alert(message);
    } else {
        return true;  
    }
}