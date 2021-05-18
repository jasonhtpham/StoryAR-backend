

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

/**
 * 
 * @param {Object} payload the payload contains story object 
 * @param {Function} callback 
 */
const addStory = (payload, callback) => {
  let dataToSave = payload;
  let storyData = null;

  async.series(
    [
      (cb) => {
        // Validate assets
        if (payload.assets.length == 0) cb(ERROR.CUSTOM_ERROR("Assets are required", 400));
        else cb();

      },
      (cb) => {
        let assetsToSave = [];

        // Validate coordinates and construct assetsToSave
        payload.assets.forEach(asset => {
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
        if (!payload.aim) cb(ERROR.CUSTOM_ERROR("Missing aim", 400));
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
  // appLogger.info(payload);
  return callback(null, "getAllStory api hit");
};

const getStory = (storyId, callback) => {
  appLogger.info(storyId);
  return callback(null, storyId);
};

export default {
  addStory,
  getAllStory,
  getStory,
};
