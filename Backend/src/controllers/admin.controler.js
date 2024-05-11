import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Journal } from "../models/journal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/nodemailer.js";
import { ReviewerRequest } from "../models/reviewerRequest.model..js";
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
        const {id} = req.params;
        let reviewers = req.body
        //console.log(reviewers);

        const journalData = await Journal.findOne({_id:id});

        if(!journalData){
            console.log("journal data is not present");
            throw new ApiError(400,"Journal data is not find in database")
        }
        
        for(let i=0;i<reviewers.length;i++){
            journalData.reviewers.push(reviewers[i]._id);
            // const mailRes= await sendEmail(reviewers[i].email);
            // if(!mailRes){
            //   console.log("some error while sending mail to Reviewer");
            //   throw new ApiError(405,"error while sending mail");
            // }
            // console.log("mail send");
        }

        journalData.status = "allowted";

        const updateInfo = await journalData.save();

        if(!updateInfo){
            console.log("error while update the document ");
            throw new ApiError(501,"some error while saving the document into database");
        }

        res.status(200).json(
            new ApiResponse(100,"Reviewer Added Successfully")
        );

    } catch (error) {
        console.log("Error while adding the reviewer server side",error);
        throw new ApiError(500, "Some internal Server Error while adding reviewer");
    }
});

const getAllReviewerRequest = asyncHandler(async(req,res)=>{
    try {
        const data = await ReviewerRequest.find({}).populate({
            path: 'reviewerId',
            select: 'name gmail qualification degree_pdf specialistArea',
        });

        if(!data){
            return res.status(200)
            .json(
                new ApiResponse(203,"Not any New request are present")
            ); 
        }

        res.status(200)
        .json(
            new ApiResponse(200,data,"All Requests are  Fetched Successfully")
        );

    } catch (error) {
        console.log("Error while fetching reviwer request from database",error);
        throw new ApiError(500, "Error while fetching reviwer request from database");
    }
});

const acceptRequest = asyncHandler(async(req,res)=>{
     try {
        const id = req.params.id;

        const data = await ReviewerRequest.findById({_id:id});
        
        const deleteItem = await ReviewerRequest.findByIdAndDelete({_id:id});
        if(!deleteItem){
            return res.status(200)
            .json(
                new ApiResponse(203,"Some error occur while accepting the request")
            );  
        }
        //console.log(data.reviewerId.toString());
        const userId = data.reviewerId.toString();

        let userData = await User.findById({_id:userId});

        if(!userData){
            return res.status(200)
            .json(
                new ApiResponse(203,"Some error occur while accepting the request")
            );  
        }

        userData.isReviewer=true;
        await userData.save();
        res.status(200)
        .json(
            new ApiResponse(200,"Request Accept Succesfully")
        );
     } catch (error) {
        console.log("Error while accepting the reviewer request",error);
        throw new ApiError(500, "Error while accepting the reviewer request");
     }
});


const rejectRequest = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id;

       const data = await ReviewerRequest.findById({_id:id});
       
       const deleteItem = await ReviewerRequest.findByIdAndDelete({_id:id});
       if(!deleteItem){
           return res.status(200)
           .json(
               new ApiResponse(203,"Some error occur while rejecting  the request")
           );  
       }
       //console.log(data.reviewerId.toString());
    //    const userId = data.reviewerId.toString();

    //    let userData = await User.findById({_id:userId});

    //    if(!userData){
    //        return res.status(200)
    //        .json(
    //            new ApiResponse(203,"Some error occur while rejecting the request")
    //        );  
    //    }

    //    userData.isReviewer=false;
    //    await userData.save();
       res.status(200)
       .json(
           new ApiResponse(200,"Request Reject Succesfully")
       );
    } catch (error) {
       console.log("Error while rejecting  the reviewer request",error);
       throw new ApiError(500, "Error while  rejecting the reviewer request");
    }
});

export { 
    getAllReviewer,
    getAllJournals,
    getJournal,
    setReviewers,
    getAllReviewerRequest,
    acceptRequest,
    rejectRequest
};
