import * as os from 'os';
import { execSync } from 'child_process';
import { SYSTEMS } from './enum';

export const isWSL = (fileName: string) => process.platform === 'linux' && fileName.startsWith('/mnt/') && /Microsft/i.test(os.release())


export const getOS = (): SYSTEMS => {
  if (typeof process === 'undefined') {
    return undefined;
  }
  if (process.platform === 'win32') return 'windows';
  if (process.platform === 'darwin') return 'osx';
  if (process.platform === 'linux') return 'linux';
  return undefined;
};
