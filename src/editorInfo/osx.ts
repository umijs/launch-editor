import * as path from 'path';

export default [
  {
    name: 'code',
    process: ['Visual Studio Code.app'],
    location: [
      path.join('/', 'Applications', 'Visual Studio Code.app'),
    ],
    commands: [
      'code',
      '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
    ],
    opts: [],
  },
  {
    name: 'code-insiders',
    process: ['Visual Studio Code - Insiders.app'],
    location: [
      path.join('/', 'Applications', 'Visual Studio Code - Insiders.app'),
    ],
    commands: [
      'code-insiders',
      '/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code-insiders',
    ],
    opts: [],
  },
  {
    name: 'atom',
    process: ['Atom.app'],
    location: [
      path.join('/', 'Applications', 'Atom.app'),
    ],
    commands: [
      'atom',
      '/Applications/Atom.app/Contents/MacOS/Atom',
    ],
  },
  {
    name: 'subl',
    process: ['Sublime Text'],
    location: [
      path.join('/', 'Applications', 'Sublime Text.app'),
      path.join('/', 'Applications', 'Sublime Text 2.app'),
      path.join('/', 'Applications', 'Sublime Text Dev.app'),
    ],
    commands: [
      'subl',
      '/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl',
      '/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl',
      '/Applications/Sublime Text Dev.app/Contents/SharedSupport/bin/subl',
    ],
  },
  {
    name: 'webstorm',
    process: ['webstorm'],
    location: [
      path.join('/', 'Applications', 'WebStorm.app'),
    ],
    commands: [
      'webstorm',
      'wstorm',
      '/Applications/WebStorm.app/Contents/MacOS/webstorm',
    ],
  },
]
