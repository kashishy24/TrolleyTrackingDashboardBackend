const express = require("express");
const router = express.Router();
const sql = require("mssql");
const dbConfig = require("../../database/db");

router.post("/dashboard/pm-cards", async (req, res) => {
  const { StartDate, EndDate } = req.body;

  if (!StartDate || !EndDate) {
    return res.status(400).json({
      success: false,
      message: "StartDate and EndDate are required",
    });
  }

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .execute("SP_DASHBOARD_PM_CARDS"); // ✅ correct SP name

    res.status(200).json({
      success: true,
      data: result.recordset[0],
    });

  } catch (error) {
    console.error("PM Cards API Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch PM cards",
    });
  }
});


router.post("/dashboard/pm-plan-actual", async (req, res) => {
  try {
    let { StartDate, EndDate } = req.body;

    /* ===============================
       1️⃣ BASIC VALIDATION
       =============================== */
    if (!StartDate || !EndDate) {
      return res.status(400).json({
        success: false,
        message: "StartDate and EndDate are required",
      });
    }

    const startDate = new Date(StartDate);
    const endDate = new Date(EndDate);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    if (startDate > endDate) {
      return res.status(400).json({
        success: false,
        message: "StartDate cannot be greater than EndDate",
      });
    }

    /* ===============================
       2️⃣ DB CALL
       =============================== */
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("StartDate", sql.Date, startDate)
      .input("EndDate", sql.Date, endDate)
      .execute("SP_DASHBOARD_PM_PLAN_ACTUAL_TREND_01");

    /* ===============================
       3️⃣ SAFE RESPONSE
       =============================== */
    res.status(200).json({
      success: true,
      count: result.recordset?.length || 0,
      data: result.recordset || [],
    });

  } catch (error) {
    console.error("PM Plan vs Actual API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch PM trend data",
      error: error.message, // optional (remove in prod)
    });
  }
});



router.post("/dashboard/pm-history-table", async (req, res) => {
  const { StartDate, EndDate, TrolleyID } = req.body;

  if (!StartDate || !EndDate) {
    return res.status(400).json({
      success: false,
      message: "StartDate and EndDate are required",
    });
  }

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .input("TrolleyID", sql.VarChar(50), TrolleyID || null)
      .execute("SP_DASHBOARD_PM_HISTORY_TABLE");

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });
  } catch (error) {
    console.error("PM History Table API Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch PM history table",
    });
  }
});

module.exports = router;   
