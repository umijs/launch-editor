import * as os from 'os';
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


export const parseFile = (file) => {
  const positionRE = /:(\d+)(:(\d+))?$/
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

