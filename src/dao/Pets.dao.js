import logger from '../utils/logger.js';
import petModel from './models/Pet.js';

export default class Pet {
  get = (params) => {
    return petModel.find(params);
  };

  getBy = (params) => {
    return petModel.findOne(params);
  };

  save = (doc) => {
    logger.log(`Pet Dao - Saving Pet: ${JSON.stringify(doc)}`);
    return petModel.create(doc);
  };

  update = (id, doc) => {
    return petModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return petModel.findByIdAndDelete(id);
  };
}
