//import { verifyJWT } from "../middleware/auth.middleware.js";
import { ReviewerverifyJWT } from "../middleware/reviewerAuth.middleware.js";
import { getAllJournalsForReview} from '../controllers/reviewer.controller.js';
import { Router } from "express";

const router =Router();

router.route('/getReviewerJournal').get(ReviewerverifyJWT,getAllJournalsForReview);
export default router;