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

export type IParseFile = (file: string) => Record<'fileName' | 'lineNumber' | 'colNumber', string>;

export const parseFile: IParseFile = (file) => {
  const fileName = file.replace(/:(\d+)(:(\d+))?/g, '')
  const match = file.match(/:(\d+)(:(\d+))?/)
  const lineNumber = match && match[1];
  const colNumber = match && match[3];

  return {
    fileName,
    lineNumber: lineNumber || '',
    colNumber: colNumber || '',
  }
}
