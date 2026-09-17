[![NPM version](https://img.shields.io/npm/v/@pubtech-ai/stub.svg?style=flat-square)](https://www.npmjs.com/package/@pubtech-ai/stub)
[![npm module downloads per month](http://img.shields.io/npm/dm/@pubtech-ai/stub.svg?style=flat)](https://www.npmjs.org/package/@pubtech-ai/stub)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/pubtech-ai-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/pubtech-ai-es)

# @pubtech-ai/stub

Cmp API Stub code.  Maybe included in commonjs loader or dropped directly on the page.

#### Installation

npm
```
npm install @pubtech-ai/stub
```

yarn
```
yarn add @pubtech-ai/stub
```
#### Using

##### include via module loading
```javascript
import * as cmpstub from '@pubtech-ai/stub';
```
or

```javascript
const cmpstub = require('@pubtech-ai/stub');
```

then execute:

```javascript
cmpstub();
```
this should generate the `__tcfapi()` window function with the queing functionality.

##### to drop on a page
```
git clone https://github.com/InteractiveAdvertisingBureau/pubtech-ai-es.git

cd pubtech-ai-es/modules/stub/

yarn // or npm install

yarn build // or npm run build
```

Built stub will be output to ./lib

##### Getting queue of commands

```javascript
const queue = __tcfapi();
console.log(queue); // [ ['command', 2, callback], ...]
```
