const forge = require('node-forge');
const crypto = require('crypto');
const {AES_ENC_KEY, IV} = require("./keys");

module.exports.encryptGCM = function (val, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, {authTagLength: 16})
    const encrypted = (Buffer.concat([cipher.update(val), cipher.final(), cipher.getAuthTag()])).toString("hex");
    return encrypted
}

module.exports.decryptGCM = function (val, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, {authTagLength: 16});
    let encryptedTextBuff = Buffer.from(val, "hex");

    const authTagBuff = encryptedTextBuff.subarray(encryptedTextBuff.length - 16);
    const encTextBuff = encryptedTextBuff.subarray(0, encryptedTextBuff.length - 16);

    decipher.setAuthTag(authTagBuff);

    let decrypted = decipher.update(encTextBuff);
    decrypted += decipher.final('utf8');
    return decrypted
}
