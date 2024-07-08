import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/signin/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "pages_read_engagement", "read_insights"],
  })
);

router.get(
  "/signin/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/done",
    failureRedirect: "/auth/signin",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
