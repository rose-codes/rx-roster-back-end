const signUpUser = (req, res) => {
  res.send("Sign Up Route");
};

const loginUser = (req, res) => {
  res.send("Login Route");
};

module.exports = { signUpUser, loginUser };
