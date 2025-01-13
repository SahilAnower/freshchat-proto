import express from "express";
import AuthService from "../services/authService.js";
import Utils from "../utils/utils.js";

const router = express.Router();

router.post("/google-signup", async (req, res) => {
  const response = await new AuthService(req.body.accessToken).googleSignup(
    req.body
  );
  if (response.body) {
    await new Utils().generateTokenAndSetCookie(response.body?._id, res);
  }
  return res.status(response.statusCode).json(response);
});

router.post("/google-signin", async (req, res) => {
  const response = await new AuthService(req.body.accessToken).googleSignIn();
  if (response.body) {
    await new Utils().generateTokenAndSetCookie(response.body?._id, res);
  }
  return res.status(response.statusCode).json(response);
});

export default router;
