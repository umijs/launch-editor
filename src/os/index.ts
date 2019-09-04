import { IEditor, ISupportedEditor, SYSTEMS } from '../enum';
import LINUX from './linux';
import OSX from './mac';
import WINDOWS from './windows';

type IOSMapping = {
  [key in SYSTEMS]: ISupportedEditor;
}
export default {
  osx: OSX,
  windows: WINDOWS,
  linux: LINUX,
} as IOSMapping;
