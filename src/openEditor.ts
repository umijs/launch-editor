import * as os from 'os';
import * as childProcess from 'child_process';
import * as path from 'path';
import { ERROR_CODE } from './enum';
import EditorError from './error';

import getArgs from './getArgs';

// function isTerminalEditor (editor) {
//   switch (editor) {
//     case 'vim':
//     case 'emacs':
//     case 'nano':
//       return true
//   }
//   return false
// }

const openEditor = async ({
  name,
  commands,
  args = [],
  fileName,
  lineNumber,
  colNumber,
}) => {
  return new Promise((resolve, reject) => {
    if (!commands.length) {
      const error = new EditorError({
        editor: name,
        code: ERROR_CODE.UNKNOWN,
      }, 'no editor avalibe');
      reject(error)
    }

    if (
      process.platform === 'linux' &&
      fileName.startsWith('/mnt/') &&
      /Microsoft/i.test(os.release())
    ) {
      // Assume WSL / "Bash on Ubuntu on Windows" is being used, and
      // that the file exists on the Windows file system.
      // `os.release()` is "4.4.0-43-Microsoft" in the current release
      // build of WSL, see: https://github.com/Microsoft/BashOnWindows/issues/423#issuecomment-221627364
      // When a Windows editor is specified, interop functionality can
      // handle the path translation, but only if a relative path is used.
      fileName = path.relative('', fileName);
    }

    if (lineNumber) {
      const extraArgs = getArgs(
        name,
        fileName,
        lineNumber,
        colNumber,
      );
      args = args.concat(extraArgs);
    } else {
      args.push(fileName);
    }

    /* eslint-disable no-restricted-syntax */
    for (const command of commands) {
      try {
        let _childProcess = null;
        if (process.platform === 'win32') {
          // On Windows, launch the editor in a shell because spawn can only
          // launch .exe files.
          _childProcess = childProcess.spawnSync(
            'cmd.exe',
            ['/C', command].concat(args),
            { stdio: 'inherit' },
          );
        } else {
          _childProcess = childProcess.spawnSync(command, args, { stdio: 'inherit' });
        }
        if (_childProcess && _childProcess.status !== null) {
          resolve({
            success: true,
            editorBin: command,
            message: '成功打开编辑器',
          });
          break;
        }
      } catch (e) {}
    }
    /* eslint-enable  */

    const error = new EditorError({
      success: false,
      editor: name,
    }, '不能打开编辑器');

    reject(error);
  });
}

export default openEditor;
