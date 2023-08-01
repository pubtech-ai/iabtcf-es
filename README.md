[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

## 1.6.5 Stable for TCF v2.2
## 1.7.0 Little performance Improvement: code [PI-0] revertable

# @iabtcf

Official JavaScript / TypeScript compliant tool suite for implementing the Transparency and Consent Framework (TCF) v2.2.  The essential toolkit for CMPs.

This is a mono repo containing 5 modules:

[Core](./modules/core#iabtcfcore) - For encoding/decoding TC strings and tools for handling the Global Vendor List (GVL).

[CmpApi](./modules/cmpapi#iabtcfcmpapi) - CMP in-page API (`__tcfapi()`) tool that works with the core library.

[cli](./modules/cli#iabtcfcli) - Tool to decode a TC string on the command line interface (cli).

[Testing](./modules/testing#iabtcftesting) - Tools for testing the core library including random TCModel and GVL generators.

[Stub](./modules/stub#iabtcfstub) - Code for the on-page `__tcfapi()` CMP stub.

## Contributing

Here you can find the [contributing guide](CONTRIBUTING.md) to help maintain and update the library.