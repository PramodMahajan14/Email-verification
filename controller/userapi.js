const express = require("express");
const router = express.Router();
require("../model/userschema");
const sendEmail = require("./sendmail");

router.post("/v1", async (req, res) => {
  try {
    const { userID, mobileNO, email } = req.body;

    if ((!userID, !mobileNO || !email)) {
      return res
        .status(400)
        .json({ msg: "please fill the all field", statuscode: 400 });
    }

    console.log(req.body);
    if (!validEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    const url = "google.com";
    await sendEmail(email, url, "Verify your email address");
    return res
      .status(200)
      .json({ msg: "Your Registration  Successfully check your email !" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const validEmail = (email) => {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
};

module.exports = router;
