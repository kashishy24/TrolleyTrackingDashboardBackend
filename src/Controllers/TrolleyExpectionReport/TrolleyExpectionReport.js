const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares");

/* -------------------------------------------------
   1. TOTAL DUPLICATE & WRONG MOVEMENT
--------------------------------------------------*/
router.get("/TrolleyTotalDuplicateWrongMovement", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "startDate and endDate are required"
      );
    }

    const request = new sql.Request();
    request.input("StartDate", sql.DateTime, startDate);
    request.input("EndDate", sql.DateTime, endDate);

    const result = await request.execute(
      "SP_Dashboard_Trolley_Total_Duplicate_WrongMovement_DynamicDate"
    );

    const data = {
      duplicateMovement: result.recordsets?.[0]?.[0]?.DuplicateMovement ?? 0,
      wrongMovement: result.recordsets?.[0]?.[0]?.WrongMovement ?? 0,
    };

    middlewares.standardResponse(res, data, 200, "success");
  } catch (error) {
    console.error("Total Duplicate/Wrong Movement error:", error);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching total duplicate & wrong movement data"
    );
  }
});

/* -------------------------------------------------
   2. ERROR MOVEMENT SOURCE → DESTINATION
--------------------------------------------------*/
router.get("/wrong-duplicate-movement", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "startDate and endDate are required"
      );
    }

    const request = new sql.Request();
    request.input("StartDate", sql.Date, startDate);
    request.input("EndDate", sql.Date, endDate);

    const result = await request.execute(
      "SP_Dashboard_WrongDuplicateMovement_SourceDestination1"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );
  } catch (error) {
    console.error("Wrong/Duplicate Movement error:", error);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching wrong & duplicate movement data"
    );
  }
});

/* -------------------------------------------------
   3. DUPLICATE & WRONG MOVEMENT (LOCATION WISE)
--------------------------------------------------*/
router.get("/TrolleyDuplicateWrongMovement", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "startDate and endDate are required"
      );
    }

    const request = new sql.Request();
    request.input("StartDate", sql.DateTime, startDate);
    request.input("EndDate", sql.DateTime, endDate);

    const result = await request.execute(
      "SP_Dashboard_Duplicate_WrongMovement_LocationWise_DynamicDate"
    );

    const data = {
      duplicateMovement: result.recordsets?.[0] ?? [],
      wrongMovement: result.recordsets?.[1] ?? [],
    };

    middlewares.standardResponse(res, data, 200, "success");
  } catch (error) {
    console.error("Location Wise Movement error:", error);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching duplicate & wrong movement location-wise data"
    );
  }
});

/* -------------------------------------------------
   4. ERROR MOVEMENT HISTORY TABLE
--------------------------------------------------*/
router.post("/error-movement-history", async (req, res) => {
  try {
    const { StartDate, EndDate } = req.body;

    if (!StartDate || !EndDate) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "StartDate and EndDate are required"
      );
    }

    const request = new sql.Request();
    request.input("StartDate", sql.Date, StartDate);
    request.input("EndDate", sql.Date, EndDate);

    const result = await request.execute(
      "SP_DASHBOARD_ERROR_MOVEMENT_HISTORY"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );
  } catch (error) {
    console.error("Error Movement History error:", error);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching movement history"
    );
  }
});

module.exports = router;
