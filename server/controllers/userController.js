const userSchema = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const subjectSchema = require("../models/subject.model");
const sourceSchema = require("../models/sources.model");
const QuizUsers = require("../models/quiz.model");
const { client } = require("../paypalConfig");
const paypal = require("@paypal/checkout-server-sdk");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(404)
      .json({ msg: "Please provide username and password" });
  try {
    let user = await userSchema.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "This User Is Not Registered" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(404).json({ msg: "Invalid Password" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    if (user.active == false)
      return res
        .status(404)
        .json({ msg: "Your Account Is Not Activated Yet!", id: user._id });
    return res.status(200).json({ token, user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Faild To Login, Please Try Again Later." });
  }
};
const register = async (req, res) => {
  const { firstName, lastName, email, password, country } = req.body;
  const userExist = await userSchema.findOne({ email });
  if (userExist) return res.status(409).json({ msg: "User Already Exists" });
  else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new userSchema({
      firstName,
      lastName,
      email,
      password: hashPassword,
      active: false,
      country,
    });
    try {
      const savedUser = await newUser.save();
      return res.status(201).json({
        msg: "Registration process is done , Contact Admin To Activate Your Account",
        savedUser,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ mag: "Faild To Register, Please Try Again Later." });
    }
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find().lean();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: "Fiald Catch Users" });
  }
};
const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectSchema.find().lean();
    return res.status(200).json(subjects);
  } catch (err) {
    console.log(err);
  }
};
const changeStatus = async (req, res) => {
  const id = req.params.id;
  const active = req.body.status;
  try {
    const user = await userSchema.findByIdAndUpdate(
      id,
      { active: !active, activate: Date.now() },
      { new: true }
    );
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "fiald" });
  }
};
const getSources = async (req, res) => {
  try {
    const sources = await sourceSchema.find().lean();
    return res.status(200).json(sources);
  } catch (error) {
    console.log(error);
  }
};
const updatePassword = async (req, res) => {
  const id = req.params.id;
  const password = req.body.password;
  if (!password) return res.status(404).json({ msg: "password required" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userSchema.findByIdAndUpdate(id, { password: hash });
    return res.status(200).json({ msg: "Done Change Password" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "fiald" });
  }
};
const current = async (req, res) => {
  if (req.current?.type === "free") return res.status(200).json({ ok: true });
  try {
    const user = await userSchema.findById(req.current.userId);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(400);
  }
};
const resetInformation = async (req, res) => {
  const id = req.params.id;
  try {
    const question = await QuizUsers.findOne({ studentId: id });
    if (question.length > 0)
      return res.status(400).json({ msg: "You Not Have Questions" });
    const delQuestions = await QuizUsers.findOneAndDelete({ studentId: id });
    return res.status(200).json({ msg: "Your Information Was Reseted" });
  } catch (error) {
    console.log(error);
  }
};
const freeTrail = async (req, res) => {
  const token = jwt.sign(
    { userId: Date.now(), type: "free" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return res.status(201).json({
    user: {
      firstName: "Free",
      lastName: "Trail",
      email: "free@trail.com",
    },
    token,
  });
};
const createOrder = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    return res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};
const captureOrder = async (req, res) => {
  const orderID = req.body.orderID;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    return res.json(capture.result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};
module.exports = {
  login,
  register,
  getSubjects,
  getUsers,
  changeStatus,
  getSources,
  updatePassword,
  current,
  resetInformation,
  freeTrail,
  createOrder,
  captureOrder,
};
