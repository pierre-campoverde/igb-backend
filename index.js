const functions = require("firebase-functions");
const app = require("express")();
var cors = require("cors");
const {
  getAllBrands,
  postOneBrand,
  postManyBrands,
  getOneBrand,
  deleteBrand,
  updateOneBrand,
  deleteBrands,
} = require("./src/API/brands");
const { loginUser, logoutUser } = require("./src/API/users");
//Options to cross origin policy
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.app; // //Routes
app.get("/brands", getAllBrands);
app.post("/brands", postOneBrand);
app.get("/brands/:id", getOneBrand);
app.put("/brands/:id", updateOneBrand);
app.delete("/brands/:id", deleteBrand);
app.post("/gazeta", postManyBrands);
app.delete("/gazeta", deleteBrands);
//Auth routes
app.post("/login", loginUser);
app.delete("/login", logoutUser);

exports.api = functions.https.onRequest(app);
