import * as fs from 'fs';
// import * as path from 'path';
// import chalk from 'chalk';

import { parseFile } from './utils';
import guessEditor from './guessEditor';
import openEditor from './openEditor';
import EditorError from './error';
import { ERROR_CODE } from './enum';
// function wrapErrorCallback (cb) {
//   return (fileName, errorMessage) => {
//     console.log()
//     console.log(
//       chalk.red('Could not open ' + path.basename(fileName) + ' in the editor.')
//     )
//     if (errorMessage) {
//       if (errorMessage[errorMessage.length - 1] !== '.') {
//         errorMessage += '.'
//       }
//       console.log(
//         chalk.red('The editor process exited with an error: ' + errorMessage)
//       )
//     }
//     console.log()
//     if (cb) {
//       cb(fileName, errorMessage)
//     }
//   }
// }

interface IOptions {
  editor?: string;
  editorOpts?: string[];
}

const launchEditor = async (file: string, options: IOptions = {}) => {
  const { editor } = options;
  const { fileName, lineNumber, colNumber } = parseFile(file);
  if (!fs.existsSync(fileName)) {
    return;
  }

  const guessedEdiotr = guessEditor(editor);
  if (!guessedEdiotr) {
    throw new EditorError({
      editor: 'UNKnow',
      success: false,
      code: ERROR_CODE.UNKNOWN,
    })
  }
  const { name, commands } = guessedEdiotr;
  console.log('name', name);
  console.log('commands', commands);

  const params = {
    fileName,
    lineNumber,
    colNumber,
  }

  try {
    await openEditor({
      name,
      commands,
      ...params,
    });
    console.log('openEditor after');
  } catch (e) {
    console.error('first open', e)

    // if (err) {
    //   onErrorCallback(fileName, 'Open editor error');
    // }
  }
}

export = launchEditor
