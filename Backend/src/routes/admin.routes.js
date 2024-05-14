import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import {getAllReviewer,getAllJournals,getJournal,setReviewers,getAllReviewerRequest,acceptRequest, rejectRequest,getAllVolume,addVolume,addIssue, addArchive} from '../controllers/admin.controler.js'
import { verifyJWT } from "../middleware/auth.middleware.js";
import {upload} from '../middleware/multer.middleware.js';


const router =Router();

//private routes for admin
router.route('/getAllReviewer').get(verifyJWT,getAllReviewer);
router.route('/getAllJournals').get(verifyJWT,getAllJournals);
router.route('/getJournal/:id').get(verifyJWT,getJournal);
router.route('/setReviwer/:id').post(verifyJWT,setReviewers);
router.route('/getReviewerRequest').get(AdminverifyJWT,getAllReviewerRequest);
router.route('/acceptRequest/:id').delete(AdminverifyJWT,acceptRequest)
router.route('/rejectRequest/:id').delete(AdminverifyJWT,rejectRequest);
router.route('/getAllVolume').get(AdminverifyJWT,getAllVolume);
router.route('/addVolume').get(AdminverifyJWT,addVolume);
router.route('/addIssue/:volume').put(AdminverifyJWT,addIssue);
router.route('/submit-Archive').post(AdminverifyJWT,upload.single('pdfFile'),addArchive);
export default router;