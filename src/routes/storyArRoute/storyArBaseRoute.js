
import UniversalFunctions from "../../utils/universalFunctions";
import Joi from "joi";
import Controller from "../../controllers";

const Config = UniversalFunctions.CONFIG;

const addStoryApi = {
  method: "POST",
  path: "/api/storyar/addStory",
  options: {
    description: "add story api",
    tags: ["api", "storyar"],
    handler: function (request, h) {
      var payloadData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.StoryArBaseController.addStory(payloadData, function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      payload: Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        assets: Joi.array().items(
          Joi.object({
            id: Joi.number().required(),
            type: Joi.string().required(),
            lat: Joi.number().required(),
            long: Joi.number().required(),
            assetDesc: Joi.string().required(),
          })
        ),
        aim: Joi.string().required(),
      }).label("StoryAr: Add story"),
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

const getAllStoryApi = {
  method: "GET",
  path: "/api/storyar/getAllStory",
  options: {
    description: "get all story api",
    tags: ["api", "storyar"],
    handler: function (request, h) {
      var payloadData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.StoryArBaseController.getAllStory(function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

const getStoryByIdApi = {
  method: "GET",
  path: "/api/storyar/getStory/{storyId}",
  options: {
    description: "get story by id api",
    tags: ["api", "storyar"],
    handler: function (request, h) {
      const storyId = request.params.storyId;
      return new Promise((resolve, reject) => {
        Controller.StoryArBaseController.getStory(storyId, function (
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      params: Joi.object({
        storyId: Joi.string().required(),
      }).label("StoryAr: Get story by ID"),
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

export default [
  addStoryApi,
  getAllStoryApi,
  getStoryByIdApi,
];