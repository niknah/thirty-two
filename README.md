# thirty-two

Implementation of RFC 3548 Base32 encoding/decoding for node.

This version is for browser use.  The original version was for node.

The difference is...
- encode takes Uint8Array and outputs a string.
- decode takes string and outputs Uint8Array

## Usage
```javascript

import { default as base32 } from './lib/thirty-two/index.js';

var decoded;
console.log(decoded=base32.decode('NZXWIZI='));
console.log(base32.encode(decoded));
```

## Testing

Download [Jasmine](https://jasmine.github.io/).  Link to the path where you downloaded jasmine below...

```bash

cd spec
ln -s ../ThePathTo/libs/Jasmine-xx/ jasmine_lib
python3 -m http.server

```

On your browser, go to [http://localhost:8000/test.html](http://localhost:8000/test.html)

