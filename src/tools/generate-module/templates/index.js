/* eslint-disable @typescript-eslint/no-var-requires */
const controller = require('./controller');
const modules = require('./module');
const model = require('./model');
const service = require('./service');
const createDto = require('./dto/create');
const updateDto = require('./dto/update');
const getDto = require('./dto/get');
const dto = require('./dto/dto');

module.exports = [
  controller,
  modules,
  model,
  service,
  createDto,
  updateDto,
  getDto,
  dto,
];
