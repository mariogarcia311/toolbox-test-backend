const { assert } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const sinon = require('sinon');
const {
  adapterDataFile,
  validateDataFile,
} = require('../src/adapters/filesAdapter');
const FilesService = require('../src/services/filesService');

describe('FilesService Tests', () => {
  let filesService, axiosMock;

  beforeEach(() => {
    axiosMock = {
      get: sinon.stub(),
    };
    filesService = new FilesService(axiosMock);
  });

  describe('adapterDataFile', () => {
    it('should adapt file data correctly', () => {
      const match = {
        groups: {
          hex: '70ad29aacf0b690b0467fe2b2767f765',
          text: 'RgTya',
          number: '64075909',
        },
      };
      const adaptedData = adapterDataFile(match);
      assert.deepStrictEqual(adaptedData, {
        hex: '70ad29aacf0b690b0467fe2b2767f765',
        text: 'RgTya',
        number: 64075909,
      });
    });

    it('should return null if match is null', () => {
      const adaptedData = adapterDataFile(null);
      assert.strictEqual(adaptedData, null);
    });
  });

  describe('validateDataFile', () => {
    it('should validate and adapt data correctly', () => {
      const data = 'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765';
      const validatedData = validateDataFile(data);
      assert.deepStrictEqual(validatedData, {
        hex: '70ad29aacf0b690b0467fe2b2767f765',
        text: 'RgTya',
        number: 64075909,
      });
    });

    it('should return null for invalid data', () => {
      const data = 'invalid,data';
      const validatedData = validateDataFile(data);
      assert.strictEqual(validatedData, null);
    });
  });

  describe('FilesService.getFiles', () => {
    it('should return adapted file data correctly', async () => {
      axiosMock.get.onFirstCall().resolves({
        data: { files: ['file1.csv'] },
      });

      axiosMock.get.onSecondCall().resolves({
        data: `file1.csv,hola,64075909,dde47c474ba2275de9ccaea519eeae31\nfile1.csv,cualquiertexto,34435345,0845f9b8f2b5875c1aa6231cf5536709`,
      });

      const result = await filesService.getFiles();

      assert.deepStrictEqual(result, [
        {
          file: 'file1.csv',
          lines: [
            {
              hex: 'dde47c474ba2275de9ccaea519eeae31',
              text: 'hola',
              number: 64075909,
            },
            {
              hex: '0845f9b8f2b5875c1aa6231cf5536709',
              text: 'cualquiertexto',
              number: 34435345,
            },
          ],
        },
      ]);
    });

    it('should handle errors and return empty lines array', async () => {
      axiosMock.get.onFirstCall().resolves({
        data: { files: ['file1.csv'] },
      });

      axiosMock.get.onSecondCall().rejects(new Error('Network Error'));

      const result = await filesService.getFiles();

      assert.deepStrictEqual(result, [
        {
          file: 'file1.csv',
          lines: [],
        },
      ]);
    });

    it('should handle errors in getFiles method', async () => {
      const internalMessageError = 'Network Error';
      axiosMock.get.rejects(internalMessageError);
      try {
        await filesService.getFiles();
      } catch (error) {
        assert.strictEqual(
          error.message,
          `Internal sever error ${internalMessageError}`
        );
      }
    });
  });
});
