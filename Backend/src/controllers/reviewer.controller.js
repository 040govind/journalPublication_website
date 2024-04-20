import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Journal } from "../models/journal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/nodemailer.js";

const getAllJournalsForReview = asyncHandler(async(req,res)=>{
    try {
        const reviewer = req.user._id;
        //console.log("here");
        const journals = await Journal.find({'reviewers._id':new mongoose.Types.ObjectId(reviewer)});
        if(journals.length === 0){
           return res.status(200).josn(
            new ApiResponse(200,"Not Any paper present for reviewing")
           );
        }

        return res.status(200).json(
            new ApiResponse(200,journals,"All Journal Fetched Successfully")
        );

    } catch (error) {
        console.log("error in  fetching journal in reviewer side ",error);
       throw new ApiError(500, "Some internal Server Error while fetching journal for reviewer side");
    }
});

export{
    getAllJournalsForReview
}