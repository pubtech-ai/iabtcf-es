import {BitLength} from '../BitLength.js';
import {BooleanEncoder} from './BooleanEncoder.js';
import {DecodingError} from '../../errors/index.js';
import {IntEncoder} from './IntEncoder.js';
import {PurposeRestrictionVector, PurposeRestriction} from '../../model/index.js';

export class PurposeRestrictionVectorEncoder {

  public static encode(prVector: PurposeRestrictionVector): string {

    // start with the number of restrictions
    let bitString = IntEncoder.encode(prVector.numRestrictions, BitLength.numRestrictions);

    // if the vector is empty we'll just return a string with just the numRestricitons being 0
    if (!prVector.isEmpty()) {

      const gvlVendorIds = Array.from(prVector.gvl.vendorIds);

      const nextGvlVendor = (vendorId, lastVendorId) => {

        const firstIndex = gvlVendorIds.indexOf(vendorId);
        const lastIndex = gvlVendorIds.indexOf(lastVendorId);

        if (lastIndex - firstIndex > 0) {

          const nextIndex = gvlVendorIds.indexOf(vendorId + 1);

          return {
            nextVendorId: gvlVendorIds[nextIndex],
            index: gvlVendorIds[firstIndex + 1],
          };

        }

        return {
          nextVendorId: vendorId,
          index: vendorId,
        };

      };

      const cachedResults: Map<Set<number>, { numEntries: number; rangeField: string }> = new Map();
      // create each restriction group
      prVector.getRestrictions().forEach((purpRestriction: PurposeRestriction): void => {

        // every restriction group has the purposeId and the restrictionType;
        bitString += IntEncoder.encode(purpRestriction.purposeId, BitLength.purposeId);
        bitString += IntEncoder.encode(purpRestriction.restrictionType, BitLength.restrictionType);

        // now get all the vendors under that restriction
        const vendorsReference = prVector.getVendorsSet(purpRestriction);

        /**
         * numEntries comes first so we will have to keep a counter and the do
         * the encoding at the end
         */
        let numEntries = 0;
        let rangeField = '';

        if (cachedResults.has(vendorsReference)) {

          const cachedResult = cachedResults.get(vendorsReference);
          numEntries = cachedResult.numEntries;
          rangeField = cachedResult.rangeField;

        } else {

          const vendors = Array.from(vendorsReference).sort((a, b) => a - b);
          const len: number = vendors.length;
          let startId = 0;

          for (let i = 0; i < len; i ++) {

            const vendorId: number = vendors[i];

            if (startId === 0) {

              numEntries++;
              startId = vendorId;

            }

            let isRangeEncodeRequired = i === len - 1;

            if (!isRangeEncodeRequired) {

              const {nextVendorId, index} = nextGvlVendor(vendorId, vendors[len - 1]);

              if (vendors[i + 1] > nextVendorId) {

                isRangeEncodeRequired = true;

              } else if (index > i && index < len) {

                i = index;

              }

            }

            /**
             * @todo require to write a test to cover this part.
             */
            if (vendorId == i - 1 && len == i + 1) {

              isRangeEncodeRequired = true;

            }

            /**
             * either end of the loop or there are GVL vendor IDs before the next one
             */
            if (isRangeEncodeRequired) {

              /**
               * it's a range entry if we've got something other than the start
               * ID
               */
              const isRange = !(vendorId === startId);

              // 0 means single 1 means range
              rangeField += BooleanEncoder.encode(isRange);
              rangeField += IntEncoder.encode(startId, BitLength.vendorId);

              if (isRange) {

                rangeField += IntEncoder.encode(vendorId, BitLength.vendorId);

              }

              // reset the startId so we grab the next id in the list
              startId = 0;

            }

          }

          cachedResults.set(vendorsReference, {
            numEntries,
            rangeField,
          });

        }

        /**
         * now that the range encoding is built, encode the number of ranges
         * and then append the range field to the bitString.
         */
        bitString += IntEncoder.encode(numEntries, BitLength.numEntries);
        bitString += rangeField;

      });

    }

    return bitString;

  }

  public static decode(encodedString: string): PurposeRestrictionVector {

    let index = 0;
    const vector: PurposeRestrictionVector = new PurposeRestrictionVector();
    const numRestrictions: number = IntEncoder.decode(encodedString.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);

    index += BitLength.numRestrictions;

    for (let i = 0; i < numRestrictions; i++) {

      // First is purpose ID
      const purposeId = IntEncoder.decode(encodedString.substr(index, BitLength.purposeId), BitLength.purposeId);
      index += BitLength.purposeId;
      // Second Restriction Type
      const restrictionType = IntEncoder.decode(encodedString.substr(index, BitLength.restrictionType), BitLength.restrictionType);
      index += BitLength.restrictionType;

      const purposeRestriction: PurposeRestriction = new PurposeRestriction(purposeId, restrictionType);
      // Num Entries (number of vendors)
      const numEntries: number = IntEncoder.decode(encodedString.substr(index, BitLength.numEntries), BitLength.numEntries);
      index += BitLength.numEntries;

      for (let j = 0; j < numEntries; j++) {

        const isARange: boolean = BooleanEncoder.decode(encodedString.substr(index, BitLength.anyBoolean));
        index += BitLength.anyBoolean;

        const startOrOnlyVendorId: number = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
        index += BitLength.vendorId;

        if (isARange) {

          const endVendorId: number = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
          index += BitLength.vendorId;

          if (endVendorId < startOrOnlyVendorId) {

            throw new DecodingError(`Invalid RangeEntry: endVendorId ${endVendorId} is less than ${startOrOnlyVendorId}`);

          }

          // Can be optimized if required
          for ( let k: number = startOrOnlyVendorId; k <= endVendorId; k++) {

            vector.add(k, purposeRestriction);

          }

        } else {

          vector.add(startOrOnlyVendorId, purposeRestriction);

        }

      }

    }

    vector.bitLength = index;

    return vector;

  }

}
