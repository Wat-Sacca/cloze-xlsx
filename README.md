# cloze-xlsx

Give it .xlsx file with a list of setences and it will give you clozed word in each sentece.

## Example

### Entry

| Test                 |     |     |     |     |
| -------------------- | --- | --- | --- | --- |
| vandāmi dhammaṃ aham |     |     |     |     |
| ādarena taṃ          |     |     |     |     |
|                      |     |     |     |     |

### Result

| Test                | Answer  | Wrong Answer 1 | Wrong Answer 2 | Wrong Answer 3 |
| ------------------- | ------- | -------------- | -------------- | -------------- |
| \_\_\_ dhammaṃ aham | vandāmi | vandami        | vāndāmi        | vandāmī        |
| \_\_\_ taṃ          | ādarena | ādarena        | adarena        | ādārena        |
|                     |         |                |                |                |

## Instructions

1. Run 'node index' to run the script from CLI

2. Run 'npm start' to run Electron version

Development is still in progress, Electron version is in alpha stage

## Roadmap

- build automated logging of words for which applied rules did not provide enough alterations

- add automated tests
