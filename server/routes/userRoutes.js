import express from "express";
import {
  getUsersController,
  updateRoleController,
  updateUserController,
} from "../controllers/userController.js";
import {userAuth,isAdmin,isAuthor, isUser} from "../middelwares/authMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USER DATA || POST
router.get("/getAuth", userAuth, (req, res) => {
  res.status(200,"hello").send({ ok: true });
});
router.get("/getUser", userAuth,isUser, (req, res) => {
  res.status(200,"hello").send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", userAuth, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Author route auth
router.get("/author-auth", userAuth, isAuthor, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/users/:info",  getUsersController);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);
router.put("/update-role/:id", userAuth,isAuthor, updateRoleController);

export default router;
