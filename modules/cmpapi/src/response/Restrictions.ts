import {RestrictionType} from '@pubtech-ai/core';

export interface Restrictions {

  [purposeId: string]: {
    [vendorId: string]: RestrictionType;
  } | string;

}
