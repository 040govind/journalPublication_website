import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Journal } from "../models/journal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllReviewer = asyncHandler(async (req, res) => {
    try {
        const reviewer = await User.find({ isReviewer: true });
        if (!reviewer) {
            throw new ApiError(500, "Reviewer is not find");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, reviewer, "All Reviewer are fetched successfully")
            );
    } catch (error) {
        throw new ApiError(500, "Some internal Server Error");
    }
});

const getAllJournals = asyncHandler(async (req, res) => {
    try {
        const journalsWithUserInfo = await Journal.find()
            .populate({
                path: "author",
                model: User,
                select: "name email qualification", // Select only the 'name' and 'email' fields from the User model
            })
            .exec();

            // if(journalsWithUserInfo.length === 0){
            //     console.log("no data present ");
            //     // res.status(403).json(new ApiError(403,"Not any Journal present in database"));
            //     throw new ApiError(403,"Not any Journal present in database");
            // }
            res.status(200)
            .json(
                new ApiResponse(200,journalsWithUserInfo,"All Journal Fetched Successfully")
            );
    } catch (error) {
        console.log("error while fetching journal from admin side", error);
        throw new ApiError(500, "Some internal Server Error");
    }
});

const getJournal = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const journalsWithUserInfo = await Journal.find({_id:id})
            .populate({
                path: "author",
                model: User,
                select: "name email qualification", // Select only the 'name' and 'email' fields from the User model
            })
            .exec();

            // if(journalsWithUserInfo.length === 0){
            //     console.log("no data present ");
            //     // res.status(403).json(new ApiError(403,"Not any Journal present in database"));
            //     throw new ApiError(403,"Not any Journal present in database");
            // }
            res.status(200)
            .json(
                new ApiResponse(200,journalsWithUserInfo[0],"All Journal Fetched Successfully")
            );
    } catch (error) {
        console.log("error while fetching journal from admin side", error);
        throw new ApiError(500, "Some internal Server Error");
    }
});

const setReviewers = asyncHandler(async(req,res)=>{
    try {
        console.log(req.body);
        console.log(req.params.id);
    } catch (error) {
        
    }
})

export { 
    getAllReviewer,
    getAllJournals,
    getJournal,
    setReviewers
};
