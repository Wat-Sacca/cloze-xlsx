const xlsx = require("node-xlsx");

//const vowelList = "aeiouAEIOU";

function longest(str) {
  var words = str.split(" ");
  var longest = "";
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }
  return longest;
}

replacementChars1 = {
  ā: "a",
  a: "ā"
};

replacementChars2 = {
  ī: "i",
  i: "ī",
  ū: "u",
  u: "ū",
  ṅ: "n",
  n: "ṅ"
};

replacementChars3 = {
  ṭṭ: "t",
  ṭ: "t",
  tt: "ṭṭ",
  t: "ṭ",
  ḍḍ: "dd",
  ḍ: "d",
  dd: "ḍḍ",
  d: "ḍ",
  ḷḷ: "ḷḷ",
  ḷ: "l",
  ll: "ḷḷ",
  l: "ḷ"
};

const workSheetsFromFile = xlsx.parse(`${__dirname}/entry.xlsx`);

const sheets = workSheetsFromFile;

const firstSheet = sheets[0];
const firstSheetRows = firstSheet.data;

const firstSheetRowsNonempty = firstSheetRows.filter(array => {
  return array.length > 0;
});

console.log("firstSheetRowsNonempty", firstSheetRowsNonempty[1]);

let data = [];

firstSheetRowsNonempty.forEach((row, i) => {
  if (i > 0) {
    const sentence = row[0];

    const selectedWord = longest(sentence);

    replacementChars = Object.assign(
      replacementChars1,
      replacementChars2,
      replacementChars3
    );

    lookupChars = Object.keys(replacementChars);

    const newSentence = sentence.replace(selectedWord, "___");

    let firstWrong = "";

    for (let i = 0; i < lookupChars.length; i++) {
      const charIndexOf = selectedWord.indexOf(lookupChars[i]);
      if (charIndexOf > -1) {
        const char = lookupChars[i];
        firstWrong = selectedWord.replace(char, replacementChars[char]);
        lookupChars.splice(lookupChars.indexOf(char), 1);
        break;
      }
    }

    let secondWrong = "";

    for (let i = 0; i < lookupChars.length; i++) {
      const charIndexOf = selectedWord.indexOf(lookupChars[i]);
      if (charIndexOf > -1) {
        const char = lookupChars[i];
        secondWrong = selectedWord.replace(char, replacementChars[char]);
        lookupChars.splice(lookupChars.indexOf(char), 1);
        break;
      }
    }

    let thirdWrong = "";

    for (let i = 0; i < lookupChars.length; i++) {
      const charIndexOf = selectedWord.indexOf(lookupChars[i]);
      if (charIndexOf > -1) {
        const char = lookupChars[i];
        thirdWrong = selectedWord.replace(char, replacementChars[char]);
        lookupChars.splice(lookupChars.indexOf(char), 1);
        break;
      }
    }

    let fourthWrong = "";

    for (let i = 0; i < lookupChars.length; i++) {
      const charIndexOf = selectedWord.indexOf(lookupChars[i]);
      if (charIndexOf > -1) {
        const char = lookupChars[i];
        fourthWrong = selectedWord.replace(char, replacementChars[char]);
        lookupChars.splice(lookupChars.indexOf(char), 1);
        break;
      }
    }

    console.log(
      "selectedWord, firstWrong, secondWrong, thirdWrong, fourthWrong",
      selectedWord,
      firstWrong,
      secondWrong,
      thirdWrong,
      fourthWrong
    );
    data.push([
      newSentence,
      selectedWord,
      firstWrong,
      secondWrong,
      thirdWrong,
      fourthWrong
    ]);
  }
});

var buffer = xlsx.build([{ name: "cloze-example", data: data }]); // Returns a buffer

var fs = require("fs");

var wstream = fs.createWriteStream("result.xlsx");
// creates random Buffer of 100 bytes
wstream.write(buffer);
// create another Buffer of 100 bytes and write
wstream.end();
