import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import guessEditor from './guessEditor';
import openEditor from './openEditor';

function wrapErrorCallback (cb) {
  return (fileName, errorMessage) => {
    console.log()
    console.log(
      chalk.red('Could not open ' + path.basename(fileName) + ' in the editor.')
    )
    if (errorMessage) {
      if (errorMessage[errorMessage.length - 1] !== '.') {
        errorMessage += '.'
      }
      console.log(
        chalk.red('The editor process exited with an error: ' + errorMessage)
      )
    }
    console.log()
    if (cb) {
      cb(fileName, errorMessage)
    }
  }
}

const positionRE = /:(\d+)(:(\d+))?$/
function parseFile (file) {
  const fileName = file.replace(positionRE, '')
  const match = file.match(positionRE)
  const lineNumber = match && match[1]
  const colNumber = match && match[3]
  return {
    fileName,
    lineNumber,
    colNumber
  }
}

async function launchEditor (file, specifiedEditor, onErrorCallback) {
  const parsed = parseFile(file)
  let { fileName } = parsed
  const { lineNumber, colNumber } = parsed

  if (!fs.existsSync(fileName)) {
    return;
  }

  if (typeof specifiedEditor === 'function') {
    onErrorCallback = specifiedEditor
    specifiedEditor = undefined
  }

  onErrorCallback = wrapErrorCallback(onErrorCallback)

  let [editor, ...args] = guessEditor(specifiedEditor);

  const params = {
    fileName,
    lineNumber,
    colNumber
  }

  const { err } = await openEditor({
    editor,
    args,
    ...params
  })

  // try process when command line failed
  if (err) {
    let [editor, ...args] = guessEditor(specifiedEditor, true);

    const { err } = await openEditor({
      editor,
      args,
      ...params
    })

    if (err) {
      onErrorCallback(fileName, 'Open editor error');
    }
  }
}

export default launchEditor
