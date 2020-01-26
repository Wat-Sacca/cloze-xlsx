const { dialog } = require("electron").remote;
const xlsx0 = require("node-xlsx");
const xlsx = require("xlsx");
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

document.querySelector("#selectBtn").addEventListener("click", function(event) {
  dialog
    .showOpenDialog(
      {
        properties: ["openFile", "multiSelections"]
      },
      function(files) {
        console.log("files");
        if (files !== undefined) {
          console.log("files", files);
        }
      }
    )
    .then(result => {
      console.log("filePath", result.filePaths[0]);

      ////MAIN CODE
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
        l: "ḷ",
        ṃ: "m"
      };
      //var o = dialog.showOpenDialog({ properties: ['openFile'] });

      const workSheetsFromFile = xlsx0.parse(result.filePaths[0]);
      var workbook = xlsx.readFile(result.filePaths[0]);

      console.log("workSheetsFromFile!!!", workSheetsFromFile);
      console.log("workbook!!!!", workbook);

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

      var buffer = xlsx0.build([{ name: "cloze-example", data: data }]); // Returns a buffer
      console.log("buffer!!", buffer.toString("utf-8"));
      var fs = require("fs");

      /*var wstream = fs.createWriteStream("result.xlsx");
  // creates random Buffer of 100 bytes
  wstream.write(buffer);
  // create another Buffer of 100 bytes and write
  wstream.end();*/

      /*dialog.showSaveDialog(saveOptions, filename => {
        console.log('filename', filename)
        fs.writeFile(filename, buffer.toString("utf-8"), "utf-8");
      });*/

      dialog.showSaveDialog(null, saveOptions, (path) => {
        console.log(path);
        fs.writeFile(path, buffer.toString("utf-8"), "utf-8");

      });

      /*var savePath = dialog.showSaveDialog(saveOptions);
    console.log('savePath', savePath)
      fs.writeFile(savePath, buffer.toString("utf-8"), function(err) {
        // file saved or err
      });*/
    });


});

var saveOptions = {
  title: "Save file",
  defaultPath: "flashcard_deluxe_test",
  buttonLabel: "Save",

  filters: [
    { name: "xlsx", extensions: ["xlsx"] },
    { name: "All Files", extensions: ["*"] }
  ]
};
