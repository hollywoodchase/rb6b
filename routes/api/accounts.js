const express = require("express");
const router = express.Router();

const Accounts = require("../../models/Accounts");

router.get("/", async (req, res) => {
  try {
    const accounts = await Accounts.find();
    if (!accounts) throw Error("No accounts here");
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const account = await Accounts.findById(req.params.id);
    if (!account) throw Error("No accounts here");
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.post("/", async (req, res) => {
  const newAccount = new Accounts(req.body);
  try {
    const account = await newAccount.save();
    if (!account) throw Error("Something went wrong while saving post");

    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const account = await Accounts.findByIdAndDelete(req.params.id);
    if (!account) throw Error("No account there");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const account = await Accounts.findByIdAndUpdate(req.params.id, req.body);
    if (!account) throw Error("No account there");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
