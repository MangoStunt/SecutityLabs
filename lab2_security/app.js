const fs = require('fs');
const WORDS_NUM = 1000;
const FOUND_TEXT = 'for who would bear the whips and scorns of time,';
// const FOUND_TEXT = 'th\'oppressor\'s wrong, the';
const FOUND_WORDS_ARR = [];
const UNSATISFYING_CHARS_ARR = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '_', '+', '}', '{', ']', '[', ';', ':', '/', '№', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '~', '=', '|', '<', '>', '?', '`', '.'];
const RESULT_ARR = [];


const encryptedText = fs.readFileSync('task.txt', 'utf-8');
const encryptedTextArr = encryptedText.split('\r\n').filter(line => line);

const mostCommonWords = fs.readFileSync('words1k.txt', 'utf-8');
// const mostCommonWords = fs.readFileSync('words10k.txt', 'utf-8');
const mostCommonWordsArr = mostCommonWords.split('\r\n').slice(0, WORDS_NUM);
//const mostCommonWordsArr = ['the', 'for', 'and', 'sad', 'who', 'when'];
//const mostCommonWordsArr = ['and who', 'for who', 'for the', 'and the'];

console.log(encryptedTextArr)

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
    // console.log(`Xored with line ${i++}`, XORLine)
    // for (let w = 0; w < mostCommonWordsArr.length; w++) {
    // console.log(`Try keyWord:${FOUND_TEXT} ${mostCommonWordsArr[w]}`)
    let j = 0;
    // for (let j = 0; j < XORLine.length; j+=2) {
    // FOUND_WORDS_ARR.push({
    //     word: mostCommonWordsArr[w],
    //     decryptedText:
    RESULT_ARR.push(Buffer.from(
        xor(XORLine.slice(j), Buffer.from(`${FOUND_TEXT}`).toString('hex')),
        'hex'
    ).toString());
    // });
    // }
}

console.log('RESULT:', `\n${FOUND_TEXT}\n${RESULT_ARR.join('\n')}`);

// console.log(FOUND_WORDS_ARR.filter(obj => UNSATISFYING_CHARS_ARR.every(char => obj.decryptedText.indexOf(char) === -1)));
// console.log(FOUND_WORDS_ARR);
// }

/** Після першого прогону, бачимо, що для слова THE маємо повтори для
 * FOR, AND, SAD, та WH (Wh та wh) => що можна сприйняти як WHO або WHEN
 * Формуємо масив з отриманих значень: ['the', 'for', 'and', 'sad', 'who', 'when']**/

/** Після другого прогону, бачимо, що більше всього співпадінь для слів
 * THE, FOR, AND, WHO, WHEN. Ці слова точно присутні у тексті. SAD виключаємо зі списку.
 * Після повторного аналізу отриманих даних, спробуємо змістовні початки текстів:
 * ['and who', 'for who', 'for the', 'and the']**/

/** Після третього прогону, бачимо, що нам підходить пара слів FOR WHO,
 * оскільки для кожного рядку надають нам розшифрований текст в більшості випадків змістовний та,
 * на відміну від інших варіантів - без спеціпльних знаків, які на вряд чи мають бути у тексті **/

/** Спробуэио знов взяти слова зі списку слів, але тепер підставимо їх до знайдених FOR WHO
 * Наприклад, FOR WHO THE (останнє слово підставляється у циклі)**/

/** Після прогону зі словами, з додаванням перед ними FOR WHO, знайдено наступне слово - WOULD.
 * Повторюємо операцію, але з додаванням слів вже до FOR WHO WOULD **/

/** Результати перевірки за великою усіма строками стають досить складними,
 * оскільки довжина розшифрованих строк збільшилась. А також, перевірка за усіма строками втрачає актуальність,
 * так як ми вже на вірному шляху до знахлдження ключа, отже, можемо залишити лише одну строку.
 * Візьмемо другу, оскільки 1 та 2 строки найдовші та допоможуть розшифрувати увесь текст **/

/** Переглянувши результати прогону для строки 1 та 2 зі строкою FOR WHO WOULD та переліком 1000 слів,
 * було знайдено наступне слово - BEAR.
 * Продовжуємо розшифрування **/

/** Створивши більш комфортний варінт використання, діло піде швише. Знайдено наступне слово - THE **/

/** Схоже, що у наборі із 1000 слів немає відповідного. Спробуємо взяти більшу вибірку**/

/** Вибірки 10000 слів також виявилось замало, спробуємо обрати інший рядок замість першого.
 * Візьмемо 2й. Зараз він має вигляд TH'OPPRESSORS'S WRONG, TH
 * Можемо сміливо додати до нього E, вважаючи що TH - це слово THE**/

/** Вибірки у 1000 слів знов не вистачило, спробуємо 10000 **/

/** Вибірка у 10000 дала результат. Нам підійшло слово PROUD, що дало результат FOR WHO WOULD BEAR WHIPS AN.
 * Повертаємося до першої строки та продовжуємо розшифрування. Слово AN може бути як окремим словом,
 * так і початком більшого, тож його додавати не будемо **/

/** Першим співпадінням було визначено, що AN з попереднього результату це слово AND.
 * Додаємо його до строки **/

/** Наступні перевірки не дали результату ані з 1000, ані з 10000 слів.
 * Однак, ми вже маємо досить велику частину розшифрованої строки, тож, можемо спробувати знайти весь текст в Інтернеті **/

/** Строка знайшлась! Це строка із монологу Гамлета, головного героя однойменної події Уільяма Шекспіра.
 * Маючи весь рядок, розшифруємо текст повністю. Можна, звичайно, скопіювати потрібну кількість строк, але ж так цікавіше =) **/

/** Весь текст розшифровано та виведено! **/

/** THE END **/
