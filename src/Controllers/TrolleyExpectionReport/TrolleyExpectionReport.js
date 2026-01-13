const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported


// Total Duplicate & Wrong Movement API
router.get("/TrolleyTotalDuplicateWrongMovement", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const sqlRequest = new sql.Request();

    // Pass date parameters to SP
    sqlRequest.input("StartDate", sql.DateTime, startDate);
    sqlRequest.input("EndDate", sql.DateTime, endDate);

    const result = await sqlRequest.execute(
      "SP_Dashboard_Trolley_Total_Duplicate_WrongMovement_DynamicDate"
    );

    const data = {
      duplicateMovement: result.recordsets[0][0]?.DuplicateMovement ?? 0,
      wrongMovement: result.recordsets[0][0]?.WrongMovement ?? 0,
    };

    middlewares.standardResponse(res, data, 200, "success");
  } catch (err) {
    console.error("Total Duplicate/Wrong Movement error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching total duplicate & wrong movement data"
    );
  }
});

//Error Movement with its source and destination
router.get("/wrong-duplicate-movement", async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "startDate and endDate are required"
            });
        }

        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .input("StartDate", sql.Date, startDate)
            .input("EndDate", sql.Date, endDate)
            .execute("SP_Dashboard_WrongDuplicateMovement_SourceDestination1");

        res.status(200).json({
            success: true,
            data: result.recordset
        });

    } catch (error) {
        console.error("SP Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Duplicate & Wrong Movement Location Wise API
router.get("/TrolleyDuplicateWrongMovement", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const sqlRequest = new sql.Request();

    // Pass parameters to SP
    sqlRequest.input("StartDate", sql.DateTime, startDate);
    sqlRequest.input("EndDate", sql.DateTime, endDate);

    const result = await sqlRequest.execute(
      "SP_Dashboard_Duplicate_WrongMovement_LocationWise_DynamicDate"
    );

    const data = {
      duplicateMovement: result.recordsets[0], // Duplicate counts location-wise
      wrongMovement: result.recordsets[1],     // Wrong counts location-wise
    };

    middlewares.standardResponse(res, data, 200, "success");
  } catch (err) {
    console.error("Duplicate/Wrong Movement error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching duplicate & wrong movement data"
    );
  }
});

//Error Movement History Table
router.post("/error-movement-history", async (req, res) => {
  try {
    const { StartDate, EndDate } = req.body; // 🔥 FIX HERE
 
    if (!StartDate || !EndDate) {
      return middlewares.standardResponse(
        res,
        null,
        400,
        "StartDate and EndDate are required"
      );
    }
 
    const sqlRequest = new sql.Request();
    sqlRequest.input("StartDate", sql.Date, StartDate);
    sqlRequest.input("EndDate", sql.Date, EndDate);
 
    const result = await sqlRequest.execute(
      "SP_DASHBOARD_ERROR_MOVEMENT_HISTORY"
    );
 
    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );
  } catch (err) {
    console.error("Error fetching movement history error:", err);
    middlewares.standardResponse(
      res,
      null,
      500,
      "Error fetching movement history"
    );
  }
});
 

module.exports = router;