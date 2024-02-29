import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from  "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {Journal} from "../models/journal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllReviewer = asyncHandler(async(req,res)=>{

    try {
        
        const reviewer = await User.find({isReviewer:true});
        if(!reviewer){
            throw new ApiError(500,"Reviewer is not find");
        }

        return res.status(200).json(
            new ApiResponse(200,{data:reviewer},"All Reviewer are fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500,"Some internal Server Error");
    }

});

export {
   getAllReviewer,
}