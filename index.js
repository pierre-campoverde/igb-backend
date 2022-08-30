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
} = require("./src/API/brands");
const { loginUser, logoutUser } = require("./src/API/users");
//Options to cross origin policy

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// //Routes
app.get("/brands", getAllBrands);
app.post("/brands", postOneBrand);
app.get("/brands/:id", getOneBrand);
app.put("/brands/:id", updateOneBrand);
app.delete("/brands/:id", deleteBrand);
app.post("/gazeta", postManyBrands);
//Auth routes
app.post("/login", loginUser);
app.delete("/login", logoutUser);

exports.api = functions.https.onRequest(app);
