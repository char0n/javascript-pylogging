import { assert } from 'chai';

import StringTemplateStyle from '../../src/styles/StringTemplateStyle';
import LogRecord from '../../src/LogRecord';
import LoggingLevel from '../../src/LoggingLevel';
import STYLES from '../../src/styles';

const [, styleFormat] = STYLES.$;

describe('StringTemplateStyle', function () {
  context('given a style format', function () {
    let style: StringTemplateStyle;
    beforeEach(function () {
      style = new StringTemplateStyle(styleFormat);
    });

    specify('should not use time', function () {
      assert.isFalse(style.usesTime());
    });

    specify('should validate', function () {
      assert.isTrue(style.validate());
    });

    specify('should format', function () {
      const record = new LogRecord('test', LoggingLevel.INFO, 'hello world');
      const formatted = style.format(record);

      assert.strictEqual(formatted, 'INFO:test:hello world');
    });
  });

  context('given a custom format', function () {
    const format = '${asctime}:${levelname}:${name}:${message}'; // eslint-disable-line no-template-curly-in-string
    let style: StringTemplateStyle;

    beforeEach(function () {
      style = new StringTemplateStyle(format);
    });

    specify('should use time', function () {
      assert.isTrue(style.usesTime());
    });

    specify('should validate', function () {
      assert.isTrue(style.validate());
    });

    specify('should format', function () {
      const record = new LogRecord('test', LoggingLevel.INFO, 'hello world', undefined, {
        asctime: '2021-01-01T00:00:00.000Z',
      });
      const formatted = style.format(record);

      assert.strictEqual(formatted, '2021-01-01T00:00:00.000Z:INFO:test:hello world');
    });
  });

  context('given invalid format', function () {
    specify('should throw', function () {
      const style = new StringTemplateStyle('invalid');
      assert.throws(() => style.validate(), /invalid format: no fields/);
    });
  });
});
