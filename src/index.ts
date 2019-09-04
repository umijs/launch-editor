import EDITORS from './os/linux';
import getEditorConfig from './getEditorConfig';
import tryOpenEditor from './tryOpenEditor';

export interface ILanchEditorConfig {
  editor: keyof typeof EDITORS;
}

const launchEditor = async (
  path: string,
  config: Partial<ILanchEditorConfig> = {},
): Promise<void> => {
  const editor = 'sublime';
  const editorConfig = getEditorConfig(editor);
  const { args, command } = editorConfig;
  await tryOpenEditor({
    editor,
    commands: command,
    args,
  });
}

export default launchEditor;
