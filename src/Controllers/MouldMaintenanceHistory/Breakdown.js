const express = require("express");
const sql = require("mssql");
const router = express.Router();


// ---------------breakdown duration
router.get("/BreakdownDuration", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const pool = await sql.connect();
    const request = pool.request();

    // Send parameters ONLY if provided, otherwise NULL
    request.input("StartDate", sql.Date, startDate || null);
    request.input("EndDate", sql.Date, endDate || null);

    // Execute the stored procedure
    const result = await request.execute(
      "Dashboard_BreakdownDurationCustomeDate"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error executing Dashboard_BreakdownDurationCustomeDate:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching breakdown duration details (Custom Date)",
      error: error.message,
    });
  }
});

// ---------------breakdown count 
router.get("/BreakdownCount", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const pool = await sql.connect();
    const request = pool.request();

    // Send parameters ONLY if provided, otherwise NULL
    request.input("StartDate", sql.Date, startDate || null);
    request.input("EndDate", sql.Date, endDate || null);

    // Execute the stored procedure
    const result = await request.execute(
      "Dashboard_BreakdownCountCustomeDate"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error executing Dashboard_BreakdownCountCustomeDate:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching breakdown count details (Custom Date)",
      error: error.message,
    });
  }
});
// ---------------breakdown calculated details
router.get("/BreakdownCalculatedDetails", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const pool = await sql.connect();
    const request = pool.request();

    // Send parameters ONLY if provided, otherwise NULL
    request.input("StartDate", sql.Date, startDate || null);
    request.input("EndDate", sql.Date, endDate || null);

    // Execute the stored procedure
    const result = await request.execute(
      "DASHBOARD_BDDurationStats"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error executing DASHBOARD_BDDurationStats:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching breakdown min max details (Custom Date)",
      error: error.message,
    });
  }
});

// ---------------Top 10 bbreakdown by duration
router.get("/Top10BreakdownByDuration", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const pool = await sql.connect();
    const request = pool.request();

    // Send parameters ONLY if provided, otherwise NULL
    request.input("StartDate", sql.Date, startDate || null);
    request.input("EndDate", sql.Date, endDate || null);

    // Execute the stored procedure
    const result = await request.execute(
      "Dashboard_Top10_BDReasons_WithDuration"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error executing Dashboard_Top10_BDReasons_WithDuration:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching breakdown  details (Custom Date)",
      error: error.message,
    });
  }
});


// ---------------breakdown details table
router.get("/BreakdownDetailsTable", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const pool = await sql.connect();
    const request = pool.request();

    // Send parameters ONLY if provided, otherwise NULL
    request.input("StartDate", sql.Date, startDate || null);
    request.input("EndDate", sql.Date, endDate || null);

    // Execute the stored procedure
    const result = await request.execute(
      "DASHBOARD_BreakdownDetails"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error executing DASHBOARD_BreakdownDetails:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching breakdown  details (Custom Date)",
      error: error.message,
    });
  }
});
module.exports = router; 