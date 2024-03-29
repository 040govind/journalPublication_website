import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import {getAllReviewer,getAllJournals,getJournal,setReviewers} from '../controllers/admin.controler.js'
import { verifyJWT } from "../middleware/auth.middleware.js";


const router =Router();

//private routes for admin
router.route('/getAllReviewer').get(AdminverifyJWT,getAllReviewer);
router.route('/getAllJournals').get(AdminverifyJWT,getAllJournals);
router.route('/getJournal/:id').get(AdminverifyJWT,getJournal);
router.route('/setReviwer/:id').post(AdminverifyJWT,setReviewers)
export default router;