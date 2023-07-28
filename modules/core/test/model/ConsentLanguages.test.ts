import {ConsentLanguages} from '../../src/model/ConsentLanguages';
import {expect} from 'chai';

describe('model->ConsentLanguages', (): void => {

  it('should have only these languages', (): void => {

    const consentLanguages = new ConsentLanguages();
    const languages = [
      'AR',
      'BG',
      'BS',
      'CA',
      'CS',
      'DA',
      'DE',
      'EL',
      'EN',
      'ES',
      'ET',
      'EU',
      'FI',
      'FR',
      'GL',
      'HR',
      'HU',
      'IT',
      'JA',
      'LT',
      'LV',
      'MT',
      'NL',
      'NO',
      'PL',
      'PT-BR',
      'PT-PT',
      'RO',
      'RU',
      'SK',
      'SL',
      'SR-CYRL',
      'SR-LATN',
      'SV',
      'TR',
      'ZH',
    ];

    expect(consentLanguages.size, 'size').to.equal(languages.length);
    languages.forEach((lang: string): void => {

      expect(consentLanguages.has(lang), 'has').to.be.true;

    });

  });

});
