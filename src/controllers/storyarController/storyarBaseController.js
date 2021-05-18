

/**
 * Please use appLogger for logging in this file try to abstain from console
 * levels of logging:
 * - TRACE - ‘blue’
 * - DEBUG - ‘cyan’
 * - INFO - ‘green’
 * - WARN - ‘yellow’
 * - ERROR - ‘red’
 * - FATAL - ‘magenta’
 */
 import Service from '../../services';
 import async from "async";
 import UniversalFunctions from "../../utils/universalFunctions";

 const ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS;
 const _ = require("underscore");

/**
 * 
 * @param {Object} payload the payload contains story object 
 * @param {Function} callback 
 */
const addStory = (payloadData, callback) => {
  let dataToSave = payloadData;
  let storyData = null;

  async.series(
    [
      (cb) => {
        // Validate assets
        if (payloadData.assets.length == 0) cb(ERROR.CUSTOM_ERROR("Assets are required", 400));
        else cb();

      },
      (cb) => {
        let assetsToSave = [];

        // Validate coordinates and construct assetsToSave
        payloadData.assets.forEach(asset => {
          if (asset.coordinates.length != 2) cb(ERROR.STATUS_MSG.INVALID_LOCATION);
          const assetToSave = {
            assetDescription: asset.assetDescription,
            assetType: asset.assetType,
            location: {
              type: "Point",
              coordinates: asset.coordinates
            }
          }
          assetsToSave = [...assetsToSave, assetToSave];
        });

        dataToSave.assets = assetsToSave;

        cb();
      },
      (cb) => {
        //Validate aim
        if (!payloadData.aim) cb(ERROR.CUSTOM_ERROR("Missing aim", 400));
        else cb();
      },
      (cb) => {
        //Insert Into DB
        dataToSave.creationDate = new Date().toISOString();
        Service.StoryService.createRecord(dataToSave, (err, storyDataFromDB) => {
          if (err) {
              cb(err);
          } else {
            storyData = storyDataFromDB;
            cb();
          }
        });
      }
    ],
    (err, data) => {
      if (err) callback(err);
      else {
        callback(null,
          storyData
        );
      }
    }
  );
};

const getAllStory = (callback) => {
  let storyData = null;

  async.series(
    [
      (cb) => {
        // Retrieve all data from DB
        const projection = { title: 1};
        Service.StoryService.getRecord({}, projection, (err, storyDataFromDB) => {
          if (err) {
              cb(err);
          } else {
            storyData = storyDataFromDB;
            cb();
          }
        });
      }
    ],
    (err, data) => {
      if (err) callback(err);
      else {
        callback(null,
          storyData
        );
      }
    }
  );
};

const getStory = (payloadData, callback) => {
  let storyData = null;

  async.series(
    [
      (cb) => {
        // Retrieve all data of an entry matched provided "storyId" from DB
        const query = {_id : payloadData.storyId};
        const projection = {__v: 0};
        Service.StoryService.getRecord(query, projection, (err, storyDataFromDB) => {
          if (err) {
              cb(err);
          } else {
            storyData = storyDataFromDB;
            cb();
          }
        });
      }
    ],
    (err, data) => {
      if (err) callback(err);
      else {
        callback(null,
          storyData
        );
      }
    }
  );
};

export default {
  addStory,
  getAllStory,
  getStory,
};
