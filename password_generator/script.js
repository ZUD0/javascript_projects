const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    console.log("genepass entered")

    const len = lenEl.value;

    let password = "";

    if (upperEl.checked) {
        console.log("gp upper entered")

        password += getUppercase();
    }

    if (lowerEl.checked) {
        console.log("gp lower entered")

        password += getLowercase();
    }

    if (numberEl.checked) {
        console.log("gp num entered")

        password += getNumber();
    }

    if (symbolEl.checked) {
        console.log("gp symbol entered")

        password += getSymbol();
    }

    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
}

function generateX() {
    const xs = [];
    if (upperEl.checked) {
        console.log("gX upper entered")

        xs.push(getUppercase());
    }

    if (lowerEl.checked) {
        console.log("gX lower entered")

        xs.push(getLowercase());
    }

    if (numberEl.checked) {
        console.log("gX num entered")

        xs.push(getNumber());
    }

    if (symbolEl.checked) {
        console.log("gX symbol entered")

        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});
