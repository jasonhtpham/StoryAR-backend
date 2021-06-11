/**
 * Created by Navit on 15/11/16.
 */
 import mongoose, { Schema } from "mongoose";
//  var Config = require("../config");
 
 var userExtendedProfile = new Schema({
    userId: { type: Schema.ObjectId, ref: 'user' },
    lastUpdated: { type: Number },
    favouriteModules: [
        {
            programId: { type: Number },
            id: { type: Number },
            moduleId: { type: Schema.ObjectId, ref: 'modules' }
        }
    ],
    about: { type: String }
    // profilePhoto: { type: File}
 });
 
export default mongoose.model("userExtendedProfile", userExtendedProfile);