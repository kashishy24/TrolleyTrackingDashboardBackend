const express = require("express");
const sql = require("mssql");
const router = express.Router();


// MOULD pm sTAUS
router.get("/MouldPMStatus", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldPMStatus");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldPMStatus:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould PM Status dashboard data",
      error: error.message,
    });
  }
});

//mOULD WEEKLY PM PLAN
router.get("/MouldPMWeekWisePlan", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_PMPlan_WeekWise");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_PMPlan_WeekWise:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould PM weekwise Status dashboard data",
      error: error.message,
    });
  }
});

//MOULDWISE PM Plan

router.get("/MouldWisePMPlan", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldPMPlans");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldPMPlans:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould wise PM Plan  data",
      error: error.message,
    });
  }
});

//Mouldwise Next PM Due Date
router.get("/MouldWiseNextPMDuedate", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldPMNextDuedate");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldPMNextDuedate:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould wise MouldPMNextDuedate  data",
      error: error.message,
    });
  }
});


//Mouldwise Next PM Due by shot count
router.get("/MouldWiseNextPMDueByShot", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldPMNextDueShotcount");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldPMNextDueShotcount:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould wise MouldPMNextDue by shot count  data",
      error: error.message,
    });
  }
});


module.exports = router; 