import foo from './old/path/to/foo';
import goo from './old/goo';

export * from './old/path/to/foo';
export {default as foo} from './old/path/to/foo';
export {default as goo} from './old/goo';

foo();
goo();
