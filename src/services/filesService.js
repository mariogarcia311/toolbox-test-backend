const { validateDataFile } = require('../adapters/filesAdapter.js');
const filesApiClient = require('../config/axiosConfig.js');

class FilesService {
  constructor(apiClient = filesApiClient()) {
    this.apiClient = apiClient;
  }
  async getFiles() {
    let files;
    try {
      const { data } = await this.apiClient.get('/v1/secret/files');
      files = data.files;
      const contentFiles = await Promise.all(
        files.map(async (_file) => {
          try {
            const resp = await this.apiClient.get(`/v1/secret/file/${_file}`);
            const adaptedFileData = resp.data
              .split('\n')
              ?.map((_fileData) => {
                return validateDataFile(_fileData);
              })
              .filter((_fileData) => _fileData != null);
            return {
              file: _file,
              lines: adaptedFileData,
            };
          } catch (error) {
            console.error(error.message);
            return {
              file: _file,
              lines: [],
            };
          }
        })
      );
      return contentFiles;
    } catch (error) {
      console.error(error.message);
      throw new Error(`Internal sever error ${error}`);
    }
  }

  async getFilesList() {
    let files;
    try {
      const { data } = await this.apiClient.get('/v1/secret/files');
      files = data.files;
      return files;
    } catch (error) {
      console.error(error.message);
      throw new Error(`Internal sever error ${error}`);
    }
  }
}
module.exports = FilesService;
