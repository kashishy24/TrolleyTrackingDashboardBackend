// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const sql = require("mssql");
const dbConfig = require("../../database/db.js");

router.post("/dashboard/bd-cards", async (req, res) => {
  const { StartDate, EndDate } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .execute("SP_DASHBOARD_BDCards");

    res.status(200).json({
      success: true,
      data: result.recordset[0], // single-row dashboard data
    });
  } catch (error) {
    console.error("BD Cards API Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch BD cards data",
    });
  }
});

router.post("/breakdownduration", async (req, res) => {
  try {
    const { StartDate, EndDate } = req.body; // <-- uppercase

    if (!StartDate || !EndDate) {
      return res.status(400).json({
        success: false,
        message: "StartDate and EndDate are required",
      });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .execute("SP_Dashboard_TrolleyBreakdownDuration");

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// ------------------- Breakdown Details Table -------------------
router.post("/breakdown/details", async (req, res) => {
  try {
    const { StartDate, EndDate } = req.body;

    if (!StartDate || !EndDate) {
      return res.status(400).json({
        success: false,
        message: "StartDate and EndDate are required",
      });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .execute("SP_DASHBOARD_BreakdownDetails");

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Breakdown Details API Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
