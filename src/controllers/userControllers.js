const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Users } = require("../model/userModel");

module.exports.signUp = async (req, res) => {
  try {
    const { email } = req.body;
    const firstUser = await Users.find({});
    if (firstUser.length === 0) {
      req.body.role = "admin";
    }
    const userExist = await Users.findOne({ email: email });
    if (userExist) {
      return res.status(403).json("user already exist");
    }
    const newUser = await new Users(req.body);
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      process.env.JWTSECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({ token, message: "successfully signed in" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Users.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({ error: " incorrect email or password " });
    }
    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) {
      return res.status(404).json({ error: " incorrect email or password" });
    }
    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.email,
        username: userExist.username,
        role: userExist.role,
      },
      process.env.JWTSECRET,
      { expiresIn: "15m" }
    );
    return res.status(200).json({ token, message: "successfull logged in" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find({});
    if (allUsers.length === 0) {
      return res.status(404).json("no users found");
    }
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports.createUsers = async (req, res) => {
  const { role } = req.decoded;
  if (role !== "admin" && req.body.role === "admin") {
    return res.status(401).json("only admin can assign admin roles");
  }

  req.body.password = "xyz123";

  try {
    const userExist = await Users.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(403).json("user already exist");
    }
    const newUser = await new Users(req.body);
    await newUser.save();
    return res.status(200).json("new user created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json("parameter is missing");
    }
    const userExists = await Users.findById(id);
    if (!userExists) {
      return res.status(404).json("user not found");
    }
    return res.status(200).json(userExists);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json("parameter is missing");
    }
    const { role } = req.decoded;
    if (role !== "admin" && req.body.role === "admin") {
      return res.status(401).json("only admin can assign admin roles");
    }
    const update = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const updateUser = await Users.findByIdAndUpdate(id, update);
    if (!updateUser) {
      return res.status(404).json("no user found");
    }
    return res.status(200).json("updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("parameter is missing");
    }
    const { role } = req.decoded;
    if (role !== admin) {
      return res.status(401).json("No permission");
    }
    const deleteUser = await Users.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json("no user found");
    }
    return res.status(200).json("deleted the user");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
