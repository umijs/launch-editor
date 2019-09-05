import * as os from 'os';
import * as path from 'path';

export default [
  {
    name: 'code',
    process: ['Code.exe'],
    location: [
      path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'Microsoft VS Code'),
    ],
    commands: [
      'code',
      path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'Microsoft VS Code', 'bin', 'code.cmd'),
      'code-insiders',
    ],
    opts: [],
  },
]
