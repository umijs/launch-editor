

const path = require('path')
const shellQuote = require('shell-quote')
const childProcess = require('child_process')

// Map from full process name to binary that starts the process
// We can't just re-use full process name, because it will spawn a new instance
// of the app every time
const COMMON_EDITORS_OSX = require('./editorInfo/osx')
const COMMON_EDITORS_LINUX = require('./editorInfo/linux')
const COMMON_EDITORS_WIN = require('./editorInfo/windows')

function getAllConfig(config, isArray) {
  if (isArray) {
    let result = [];
    for (const item of config) {
      result = result.concat(item);
    }
    return result;
  }
    let result = {};
    for (const item of config) {
      result = Object.assign(result, item);
    }
    return result;
}

export default (specifiedEditor, needGuess) => {
  if (specifiedEditor && !needGuess) {
    return shellQuote.parse(specifiedEditor)
  }

  // We can find out which editor is currently running by:
  // `ps x` on macOS and Linux
  // `Get-Process` on Windows
  try {
    if (process.platform === 'darwin') {
      const currentConfig = specifiedEditor ? COMMON_EDITORS_OSX[specifiedEditor] : getAllConfig(COMMON_EDITORS_OSX);
      const output = childProcess.execSync('ps x').toString();
      const processNames = Object.keys(currentConfig);
      for (let i = 0; i < processNames.length; i++) {
        const processName = processNames[i];
        if (output.indexOf(processName) !== -1) {
          return [currentConfig[processName]];
        }
      }
    } else if (process.platform === 'win32') {
      const currentConfig = specifiedEditor ? COMMON_EDITORS_WIN[specifiedEditor] : getAllConfig(COMMON_EDITORS_WIN, true);
      // Some processes need elevated rights to get its executable path.
      // Just filter them out upfront. This also saves 10-20ms on the command.
      const output = childProcess
        .execSync(
          'wmic process where "executablepath is not null" get executablepath',
        )
        .toString();
      const runningProcesses = output.split('\r\n');
      for (let i = 0; i < runningProcesses.length; i++) {
        const processPath = runningProcesses[i].trim();
        const processName = path.basename(processPath);
        if (currentConfig.indexOf(processName) !== -1) {
          return [processPath];
        }
      }
    } else if (process.platform === 'linux') {
      const currentConfig = specifiedEditor ? COMMON_EDITORS_LINUX[specifiedEditor] : getAllConfig(COMMON_EDITORS_LINUX);
      // --no-heading No header line
      // x List all processes owned by you
      // -o comm Need only names column
      const output = childProcess
        .execSync('ps x --no-heading -o comm --sort=comm')
        .toString();
      const processNames = Object.keys(currentConfig);
      for (let i = 0; i < processNames.length; i++) {
        const processName = processNames[i];
        if (output.indexOf(processName) !== -1) {
          return [currentConfig[processName]];
        }
      }
    }
  } catch (error) {
    // Ignore...
  }

  // Last resort, use old skool env vars
  if (process.env.VISUAL) {
    return [process.env.VISUAL];
  } if (process.env.EDITOR) {
    return [process.env.EDITOR];
  }

  return [null];
}
