export enum SUPPORTED_EDITTORS {
  'vscode' = 'VSCode',
  'sublime' = 'Sublime Text',
  'atom' = 'Atom',
}

export type IEditor = keyof typeof SUPPORTED_EDITTORS;

export type IEditorExec = string[];

export type ISupportedEditor = {
  [key in IEditor]: {
    command: IEditorExec;
  };
}

export type SYSTEMS = 'osx' | 'linux' | 'windows';
