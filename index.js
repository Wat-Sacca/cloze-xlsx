const xlsx = require('node-xlsx');
const replacementRules = require('./replacementRules.js');

function longest(str) {
  var words = str.split(' ');
  var longest = '';
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }
  return longest;
}

const workSheetsFromFile = xlsx.parse(`${__dirname}/working_files/entry.xlsx`);

const sheets = workSheetsFromFile;

const firstSheet = sheets[0];
const firstSheetRows = firstSheet.data;

const firstSheetRowsNonempty = firstSheetRows.filter(array => {
  return array.length > 0;
});

let data = [];
let selectedWords = []; // catch duplicates

firstSheetRowsNonempty.forEach((row, i) => {
  if (i > 0) {
    let sentence = row[0];

    const sentenceCopy = Object.assign("", sentence);

    const selectedWord = longest(sentenceCopy);
    while(selectedWords.includes(selectedWord)){ //handle duplicates
      sentenceCopy =sentenceCopy.replace(selectedWord,'');
      selectedWord = longest(sentenceCopy)
    }

    if (!selectedWords.includes(selectedWord)) {
      lookupChars = Object.keys(replacementRules);
      selectedWords.push(selectedWord);
      const newSentence = sentence.replace(selectedWord, '___');

      let firstWrong = '';

      for (let i = 0; i < lookupChars.length; i++) {
        const charIndexOf = selectedWord.indexOf(lookupChars[i]);
        if (charIndexOf > -1) {
          const char = lookupChars[i];
          firstWrong = selectedWord.replace(char, replacementRules[char]);
          lookupChars.splice(lookupChars.indexOf(char), 1);
          break;
        }
      }

      let secondWrong = '';

      for (let i = 0; i < lookupChars.length; i++) {
        const charIndexOf = selectedWord.indexOf(lookupChars[i]);
        if (charIndexOf > -1) {
          const char = lookupChars[i];
          secondWrong = selectedWord.replace(char, replacementRules[char]);
          lookupChars.splice(lookupChars.indexOf(char), 1);
          break;
        }
      }

      let thirdWrong = '';

      for (let i = 0; i < lookupChars.length; i++) {
        const charIndexOf = selectedWord.indexOf(lookupChars[i]);
        if (charIndexOf > -1) {
          const char = lookupChars[i];
          thirdWrong = selectedWord.replace(char, replacementRules[char]);
          lookupChars.splice(lookupChars.indexOf(char), 1);
          break;
        }
      }

      let fourthWrong = '';

      for (let i = 0; i < lookupChars.length; i++) {
        const charIndexOf = selectedWord.indexOf(lookupChars[i]);
        if (charIndexOf > -1) {
          const char = lookupChars[i];
          fourthWrong = selectedWord.replace(char, replacementRules[char]);
          lookupChars.splice(lookupChars.indexOf(char), 1);
          break;
        }
      }

      data.push([
        newSentence,
        selectedWord,
        firstWrong,
        secondWrong,
        thirdWrong,
        fourthWrong
      ]);
    }
  }
});

var buffer = xlsx.build([{ name: 'cloze-example', data: data }]); // Returns a buffer

var fs = require('fs');

var wstream = fs.createWriteStream('working_files/result.xlsx');
// creates random Buffer of 100 bytes
wstream.write(buffer);
// create another Buffer of 100 bytes and write
wstream.end();
