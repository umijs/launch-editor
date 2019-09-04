import { spawn, execSync } from 'child_process';
import { IEditor, ISupportedEditor, SYSTEMS } from './enum';
import { getOS } from './utils';
import OSMapping from './os';


export default (editor: IEditor, editorOpts) => {
  const os = getOS();
  // using editor, default use VSCode
  const codeEditorConfig = OSMapping[os][editor] || OSMapping[os].vscode;
  return codeEditorConfig;
}
