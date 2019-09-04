import { ISupportedEditor } from '../enum';

export default {
  vscode: {
    args: ['-r', '-g', '-n'],
    command: [
      'code-insiders',
      '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
    ],
  },
  atom: {
    args: [],
    command: [
      'atom',
      '/Applications/Atom.app/Contents/MacOS/Atom',
    ],
  },
  sublime: {
    args: [],
    command: [
      'subl',
      '/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl',
    ],
  },
} as ISupportedEditor;
