[![NPM version](https://img.shields.io/npm/v/@pubtech-ai/testing.svg?style=flat-square)](https://www.npmjs.com/package/@pubtech-ai/testing)
[![npm module downloads per month](http://img.shields.io/npm/dm/@pubtech-ai/testing.svg?style=flat)](https://www.npmjs.org/package/@pubtech-ai/testing)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/pubtech-ai-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/pubtech-ai-es)

# @pubtech-ai/testing

Testing tools to generate randomized input/output

#### Installation

npm
```
npm install @pubtech-ai/testing --save-dev
```

yarn
```
yarn add -D @pubtech-ai/testing
```

#### Utilities
[TCModelFactory](./src/TCModelFactory.ts)

Generate random TCModel with GVL
```typescript

import {TCModelFactory} from '@pubtech-ai/testing';

const tcModel = TCModelFactory.withGVL();

```

Generate random TC string

```typescript
import {TCString} from '@pubtech-ai/core';
import {TCModelFactory} from '@pubtech-ai/testing';

console.log(TCString.encode(TCModelFactory.noGVL()));
// ... random tc string

```

Add publisher restrictions

```typescript

import {TCModelFactory} from '@pubtech-ai/testing';
let tcModel = TCModelFactory.withGVL();
tcModel = TCModelFactory.addPublisherRestrictions(tcModel);
// now has random publisher restrictions

```

[GVLFactory](./src/GVLFactory.ts)

Get latest GVL

```typescript
import {GVLFactory} from '@pubtech-ai/testing';
import {GVL} from '@pubtech-ai/core';

const gvl = GVLFactory.getLatest();

```

Get version of GVL

```typescript
import {GVLFactory} from '@pubtech-ai/testing';
import {GVL} from '@pubtech-ai/core';

const gvl = GVLFactory.getVersion(10);

```
