const fs = require('fs')
const {encryptedString1} = require("../constants");

/*First Task
* Write a piece of software to attack a single-byte XOR cipher which is the same as Caesar but with xor op. */

function hexXorDecryption(string, key) {
    const regex = new RegExp('â', 'g')
    let outputString = '';

    for (let i = 0; i < string.length; i += 2) {
        outputString += String.fromCharCode(parseInt(string.substr(i, 2), 16) ^ parseInt(key.toString(), 16));
    }

    outputString.replace(regex, '\"')
    return `Key value ${key.toString()} + ${outputString} \n`;
}

function xorKeyBruteforce(from, to, string) {
    const fileWriter = fs.createWriteStream('../results/decryption1.txt', {flags: 'a'});
    for (let i = from; i < to; i++) {
        fileWriter.write(hexXorDecryption(string, i));
    }
}

xorKeyBruteforce(1, 256, encryptedString1);

/* On HEX key 37 the outputString is:
* Now try a repeating-key XOR cipher.
* E.g. it should take a string "hello world" and, given the key is "key", xor the first letter "h" with "k",
* then xor "e" with "e", then "l" with "y", and then xor next char "l" with "k" again,
* then "o" with "e" and so on. You may use an index of coincidence, Hamming distance, Kasiski examination,
* statistical tests or whatever method you feel would show the best result. */
