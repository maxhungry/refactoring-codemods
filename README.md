# refactoring-codemods

Quest for IDE refactoring support within JavaScript via js-codemods.

Refactoring a large JavaScript codebase is no fun. Moving files around, renaming files or renaming exported functions simply breaks all dependents import/require paths, and is a huge pain to correct. Simple search and replace is NOT a good solution.

Codemods to the rescue :rocket: With the power of an AST we can determine which files in our project have previously depended on either the rename/moved file or renamed export, and automatically update the dependent code. 

Two transforms are provided as low-level AST transforms for achieve either a file rename/move or a file export rename.

## Transforms

### import-declaration-transform

Fix all dependent import/require paths when a file has been renamed/moved. 

Call this transform on your source/test files and all dependents import/require paths will be updated to match the new file name/location.

_Note: prevFilePath and nextFilePath are absolute_

```js
> jscodeshift -t import-declaration-transform fileA fileB --prevFilePath=/Users/jurassix/example/bar --nextFilePath=/Users/jurassix/example/new/path/to/bar
```

Example:

```js
import foo from './bar';
```

 becomes

 ```js
import foo from './new/path/to/bar';
 ```

### import-specifier-transform

Fix all dependent import/require variables when a file export been renamed.

Call this transform on your source/test files and all dependents import/require variables will be updated to match the new file export name.

_Note: declarationFilePath is absolute_

```js
> jscodeshift -t import-specifier-transform fileA fileB --prevSpecifier=foo --nextSpecifier=fooPrime --declarationFilePath=/Users/jurassix/example/bar
```

Example:

```js
import foo from './bar';

foo();
```

 becomes

 ```js
import fooPrime from './bar';

fooPrime();
 ```

## Contribute

### Build
```js
> npm run build
```

### Run tests
```js
> npm test
```
