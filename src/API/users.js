const config = require("../utils/config");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { validateLoginData } = require("../utils/validators");

initializeApp(config);
const auth = getAuth();

exports.loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };
  const { valid, errors } = validateLoginData(user);
  if (!valid) return response.status(400).json(errors);

  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((error) => {
      console.log(error);
      return response
        .status(403)
        .json({ general: "wrong credentials, please try again" });
    });
};
exports.logoutUser = (request, response) => {
  signOut(auth)
    .then(() => {
      return response.status(200).json({ message: "Sign Out successful" });
    })
    .catch((error) => {
      return response(error);
    });
};
