const {ENGLISH_ABC_ARR} = require("../constants");
const ENGLISH_LATTER_TEXT_FREQUENCY = require("../letter_freq.json");
const {encryptedString2} = require("../constants");

/* Second Task ]
* Now try a repeating-key XOR cipher.
* E.g. it should take a string "hello world" and, given the key is "key", xor the first letter "h" with "k",
* then xor "e" with "e", then "l" with "y", and then xor next char "l" with "k" again,
* then "o" with "e" and so on. You may use an index of coincidence, Hamming distance, Kasiski examination,
* statistical tests or whatever method you feel would show the best result. */

const helloWorld = 'helloworld'

function aliquotString (anyString, dividingNumber) {
    // console.log('Dividing', dividingNumber);
    const anyStringArr = anyString.split('');
    let outputString = '';

    for (let i = dividingNumber; i < anyStringArr.length; i+=dividingNumber) {
        outputString += anyStringArr[i];
    }

    return outputString;
}

function repeatingXor (simpleString, cipherKey) {
    const keyLength = cipherKey.length;
    const textBufferArray = new Buffer.from(simpleString).toJSON().data;
    let outputString = '';

    for (let i = 0; i < textBufferArray.length; i++) {
        outputString += String.fromCharCode(textBufferArray[i] ^ cipherKey.charCodeAt(i % keyLength))
    }

    return outputString;
}

function countMatches(firstString, secondString) {
    let matchesFound = 0;

    for (let i = 0; i < firstString.length; i++) {
        firstString.charAt(i) === secondString.charAt(i) ? matchesFound++ : null
    }
    return matchesFound;
}

function calculateIOC(anyString) {
    const outputArr = [];

    for (let i = 0; i < anyString.length; i++) {
        const offsetString = `${anyString.slice(i)}${anyString.slice(0, i)}`;
        const matchesForOffset = countMatches(anyString, offsetString);
        outputArr.push(matchesForOffset / anyString.length);
    }

    return outputArr;
}

function getKeyLength(anyString) {
    const IOC = calculateIOC(anyString);
    const outputArr = [];
    let IOCSum = 0;

    for (let i = 0; i < IOC.length; i++) {
        IOCSum += IOC[i];
    }

    const averageIOC = IOCSum / IOC.length;

    for (let i = 0; i < IOC.length; i++) {
        averageIOC < IOC[i] < 1 ? outputArr.push(IOC[i]) : null;
    }

    console.log(outputArr)
    return outputArr;
}

function countLetterFrequency(anyString) {
    let outputValue = 0;

    for (let i = 0; i < ENGLISH_ABC_ARR.length; i++) {
        const regex = customLetterRegExp(ENGLISH_ABC_ARR[i]);
        const letterFreq = anyString.match(regex);
        const expectedFreq = anyString.length * ENGLISH_LATTER_TEXT_FREQUENCY[ENGLISH_ABC_ARR[i]];
        const freqSquare = Math.pow(letterFreq - expectedFreq, 2) / expectedFreq;
        outputValue += freqSquare;
    }

    return outputValue;
}

function customLetterRegExp(letter) {
    return new RegExp(`${letter.toUpperCase()}${letter.toLowerCase()}`, 'g');
}

function repeatingXorDecryption (encryptedString, keyLength) {
    console.log(keyLength.length)
    const keyValue = '';

    for (let i = 0; i < keyLength.length; i++) {
        const aliquotStr = aliquotString(encryptedString, keyLength);
        let symbolValue = [];

        for (let j = 0; j < 256; j++) {
            const key = String.fromCharCode(j);
            const decryptedText = repeatingXor(aliquotStr, key);
            symbolValue.push({keySymbol: key, resultText: countLetterFrequency(decryptedText)});
        }

        encryptedString = `${encryptedString.slice(1)}${encryptedString.slice(0, 1)}`;
        symbolValue.forEach(keyVal => {
            symbolValue += keyVal.keySymbol;
        })
    }
    return keyValue;
}

console.log({
    keyLength: getKeyLength(encryptedString2),
    key: repeatingXorDecryption(encryptedString2, getKeyLength(encryptedString2)),
    output: repeatingXorDecryption(encryptedString2, repeatingXorDecryption(encryptedString2, getKeyLength(encryptedString2))
    ),
});
    const input = Buffer.from(encryptedString2).toString('latin1')


 // getKeyLength(input),
 // repeatingXorDecryption(input, getKeyLength(input)),
 // repeatingXor(input, repeatingXorDecryption(input, getKeyLength(input)));
