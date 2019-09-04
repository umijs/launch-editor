import openEditor from './openEditor';

const tryOpenEditor = async (options, i = 0) => {
  const { editor, commands, args } = options;
  if (i < commands.length) {
    try {
      await openEditor({
        fileName: __dirname,
        editor,
        args,
        command: commands[i],
      })
    } catch (e) {
      await tryOpenEditor(options, i + 1);
    }
  }
}

export default tryOpenEditor;
