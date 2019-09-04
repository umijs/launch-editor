import * as os from 'os';
import * as childProcess from 'child_process';
import * as path from 'path';

import getArgs from './getArgs';

function isTerminalEditor (editor) {
  switch (editor) {
    case 'vim':
    case 'emacs':
    case 'nano':
      return true
  }
  return false
}

let _childProcess = null

export default async ({
  editor,
  args,
  fileName,
  lineNumber,
  colNumber,
}) => {
  return new Promise((resolve) => {
    if (!editor) {
      resolve({
        err: 'no editor avalibe'
      })
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

    let workspace = null;
    if (lineNumber) {
      args = args.concat(
        getArgs(
          editor,
          fileName,
          lineNumber,
          colNumber,
          workspace
        )
      );
    } else {
      args.push(fileName);
    }

    if (_childProcess && isTerminalEditor(editor)) {
      // There's an existing editor process already and it's attached
      // to the terminal, so go kill it. Otherwise two separate editor
      // instances attach to the stdin/stdout which gets confusing.
      _childProcess.kill('SIGKILL');
    }

    if (process.platform === 'win32') {
      // On Windows, launch the editor in a shell because spawn can only
      // launch .exe files.
      _childProcess = childProcess.spawn(
        'cmd.exe',
        ['/C', editor].concat(args),
        { stdio: 'inherit' }
      );
    } else {
      _childProcess = childProcess.spawn(editor, args, { stdio: 'inherit' });
    }
    _childProcess.on('exit', function(errorCode) {
      _childProcess = null;

      if (errorCode) {
        resolve({
          err: '(code ' + errorCode + ')'
        })
      }
    });

    _childProcess.on('error', function(error) {
      resolve({
        err: error.message
      })
    });

    setTimeout(() => {
      resolve()
    }, 2500);
  });
}
