import * as os from 'os';
import * as path from 'path';
import spawn from 'cross-spawn';

import { ChildProcessWithoutNullStreams } from 'child_process';
import { isWSL, getOS } from './utils';
import osMapping from './os';
import { IEditor } from './enum';

export interface IOpenEditorOpts {
  editor: IEditor;
  command: string;
  fileName: string;
  args: any;
}

let _childProcess: ChildProcessWithoutNullStreams | null = null;

export default async (config: IOpenEditorOpts) => {
  return new Promise((resolve, reject) => {
    const { command, args } = config;
    console.log('runExec config', config)
    const fileName = isWSL(config.fileName)
      ? path.relative('', config.fileName)
      : config.fileName;

    if (getOS() === 'windows') {
      _childProcess = spawn('cmd.exe', ['-C', command, fileName], { stdio: 'inherit' });
    } else {
      _childProcess = spawn(command, (args || []).concat([fileName]), { stdio: 'inherit' })
    }

    _childProcess.on('exit', (errorCode) => {
      _childProcess = null;
      resolve({
        error: false,
        message: `code: ${errorCode}`,
      });
    });

    _childProcess.on('error', (error) => {
      reject(error);
    })

    setTimeout(() => {
      resolve();
    }, 2000);
  })
}
