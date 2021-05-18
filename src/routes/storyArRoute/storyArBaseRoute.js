
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
        description: Joi.string().required(),
        assets: Joi.array().items(
          Joi.object({
            assetType: Joi.string().required(),
            coordinates: Joi.array().items(
              Joi.number().required(), 
              Joi.number().required()
            ),
            assetDescription: Joi.string().required(),
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
      const payloadData = request.params;
      return new Promise((resolve, reject) => {
        Controller.StoryArBaseController.getStory(payloadData, function (
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
