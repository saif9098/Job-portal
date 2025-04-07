import express from "express";
import {
  addProfileController,
  getProfileController,
  editProfileController,
  aplicantProfilCntrolr
} from "../controllers/profileController.js";
import {isAdmin, userAuth} from "../middelwares/authMiddleware.js";

//router object
const router = express.Router();

//routes

router.post("/add-profile", userAuth, addProfileController);

router.get("/get-profile", userAuth, getProfileController);
router.get("/applicant-profile/:id", userAuth,isAdmin, aplicantProfilCntrolr);

router.put("/edit-profile", userAuth,editProfileController);

export default router;
