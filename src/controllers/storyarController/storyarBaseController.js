

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

/**
 * 
 * @param {Object} payload the payload contains story object 
 * @param {Function} callback 
 */
const addStory = (payload, callback) => {
  // appLogger.info(payload);
  return callback(null, payload);
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
