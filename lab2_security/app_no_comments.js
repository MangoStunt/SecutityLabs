const fs = require('fs');
const FOUND_TEXT = 'for who would bear the whips and scorns of time,';
const RESULT_ARR = [];


const encryptedText = fs.readFileSync('task.txt', 'utf-8');
const encryptedTextArr = encryptedText.split('\r\n').filter(line => line);

function xor(firstString, secondString) {
    if (!Buffer.isBuffer(firstString)) firstString = new Buffer.from(firstString, "hex");
    if (!Buffer.isBuffer(secondString)) secondString = new Buffer.from(secondString, "hex");
    let resultString = [];
    if (firstString.length > secondString.length) {
        for (let i = 0; i < secondString.length; i++) {
            resultString.push(firstString[i] ^ secondString[i]);
        }
    } else {
        for (let i = 0; i < firstString.length; i++) {
            resultString.push(firstString[i] ^ secondString[i]);
        }
    }
    return new Buffer.from(resultString).toString("hex");
}

for (let i = 1; i <= encryptedTextArr.length - 1; i++) {
    const XORLine = xor(encryptedTextArr[0], encryptedTextArr[i]);
    RESULT_ARR.push(Buffer.from(
        xor(XORLine.slice(0), Buffer.from(`${FOUND_TEXT}`).toString('hex')),
        'hex'
    ).toString());
}

console.log('RESULT:', `\n${FOUND_TEXT}\n${RESULT_ARR.join('\n')}`);

