/**
 * 探测可能存在的命令：
 * 1、指定了编辑器 => 依旧找 map 里的 commands
 * 2、未指定 => 先找进程 =>(找到) => 返回 commands
 *                    => (未找到) => 找安装路径
 */
import * as fs from 'fs';
// import * as shellQuote from 'shell-quote';
import * as childProcess from 'child_process';
import COMMON_EDITORS_OSX from './editorInfo/osx';
import COMMON_EDITORS_LINUX from './editorInfo/linux';
// import COMMON_EDITORS_WIN from './editorInfo/windows';

import { getOS } from './utils';
// import { IEditor } from './enum';

export interface IGuessEdiotr {
  commands: string[];
  name: string;
  opts?: string[];
}

export default (specifiedEditor): IGuessEdiotr | undefined => {
  const system = getOS();
  // if (specifiedEditor) {
  //   const [editor, ...params] = shellQuote.parse(specifiedEditor);
  //   return {
  //     name: editor as IEditor,
  //     commands:
  //     opts: params,
  //   }
  // }

  // We can find out which editor is currently running by:
  // `ps x` on macOS and Linux
  // `Get-Process` on Windows
  try {
    if (system === 'osx') {
      if (specifiedEditor) {
        return COMMON_EDITORS_OSX.find(item => item.name === specifiedEditor);
      }
      const output = childProcess.execSync('ps -ax -o comm').toString();

      return COMMON_EDITORS_OSX.find(item => {
        const { process, location } = item;
        const processBy = process.some(p => {
          console.log('output.indexOf(p) > -1', output.indexOf(p) > -1)
          return output.indexOf(p) > -1;
        });
        if (processBy) {
          return !!processBy;
        }

        // via path location
        return location.some(loc => {
          const isExisted = fs.existsSync(loc);
          console.log('loc', loc, isExisted);
          return isExisted;
        })
      });
    }

    // if (process.platform === 'win32') {
    //   const currentConfig = specifiedEditor ? COMMON_EDITORS_WIN[specifiedEditor] : COMMON_EDITORS_WIN;
    //   // Some processes need elevated rights to get its executable path.
    //   // Just filter them out upfront. This also saves 10-20ms on the command.
    //   const output = childProcess
    //     .execSync(
    //       'wmic process where "executablepath is not null" get executablepath',
    //     )
    //     .toString();
    //   const runningProcesses = output.split('\r\n');
    //   for (let i = 0; i < runningProcesses.length; i++) {
    //     const processPath = runningProcesses[i].trim();
    //     const processName = path.basename(processPath);
    //     if (currentConfig.indexOf(processName) !== -1) {
    //       return [processPath];
    //     }
    //   }
    // }

    if (process.platform === 'linux') {
      if (specifiedEditor) {
        return COMMON_EDITORS_LINUX.find(item => item.name === specifiedEditor);
      }
      // --no-heading No header line
      // x List all processes owned by you
      // -o comm Need only names column
      const output = childProcess
        .execSync('ps x --no-heading -o comm --sort=comm')
        .toString();

      return COMMON_EDITORS_LINUX.find(item => {
        const { process } = item;
        const processBy = process.some(p => {
          console.log('output.indexOf(p) > -1', output.indexOf(p) > -1)
          return output.indexOf(p) > -1;
        });
        if (processBy) {
          return !!processBy;
        }

        // via path location
        // return location.some(loc => {
        //   const isExisted = fs.existsSync(loc);
        //   console.log('loc', loc, isExisted);
        //   return isExisted;
        // })
      });
    }
  } catch (error) {
    // Ignore...
    console.error('error', error);
  }

  return undefined

  // Last resort, use old skool env vars
  // if (process.env.VISUAL) {
  //   return [process.env.VISUAL];
  // } if (process.env.EDITOR) {
  //   return [process.env.EDITOR];
  // }

  // return [null];
}
