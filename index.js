const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");  //  add this
const middlewares = require("./src/middlewares/middlewares.js");
const loginRoute = require("./src/Controllers/loginAPI.js");
const HomeRoute=require("./src/Controllers/HomePage/Home.js")
const TrolleyHistoryRoute = require("./src/Controllers/TrolleyHistory/TrolleyHistory.js")
const pmstatusRoute = require("./src/Controllers/PMstatus/PMstatus.js")
const BreakdownRoute = require("./src/Controllers/Breakdown/breakDown.js")
const app = express();



app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

//app.use(limiter);   
  // app.use("/api", limiter);
app.use(express.json());

app.use("/api/login", loginRoute);

 app.use("/api/Home",HomeRoute );
app.use("/api/TrolleyHistory",TrolleyHistoryRoute)
app.use("/api/trolleypmstatus",pmstatusRoute)
app.use("/api/Breakdown", BreakdownRoute);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/api/status", (request, response) => {
  middlewares.standardResponse(response, null, 200, "running");
});
