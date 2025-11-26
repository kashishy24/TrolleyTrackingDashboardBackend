const express = require("express");
const sql = require("mssql");
const router = express.Router();


// MOULD HC sTAUS
router.get("/MouldHCStatus", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldHCStatus");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldHCStatus:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould HC Status dashboard data",
      error: error.message,
    });
  }
});

//mOULD WEEKLY HC PLAN
router.get("/MouldHCWeekWisePlan", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_HCPlan_WeekWise");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_HCPlan_WeekWise:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould HC weekwise Status dashboard data",
      error: error.message,
    });
  }
});

//MOULDWISE HC Plan

router.get("/MouldWiseHCPlan", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldHCPlans");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldHCPlans:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould wise HC Plan  data",
      error: error.message,
    });
  }
});

//Mouldwise Next HC Due Date
router.get("/MouldWiseNextHCDuedate", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldHCNextDuedate");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldHCNextDuedate:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould wise MouldHCNextDuedate  data",
      error: error.message,
    });
  }
});


//Mouldwise Next HC Due by shot count
router.get("/MouldWiseNextHCDueByShot", async (req, res) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    // Execute the stored procedure (no parameters)
    const result = await request.execute("Dashboard_MouldHCNextDueShotcount");
    const recordsets = result.recordsets || [];
    const pmStatusData =
      recordsets.length > 1 ? recordsets[1] : result.recordset; // safe fallback

    return res.json({
      success: true,
      data: pmStatusData,
    });
  } catch (error) {
    console.error("Error executing Dashboard_MouldHCNextDueShotcount:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching Mould wise MouldHCNextDue by shot count  data",
      error: error.message,
    });
  }
});


module.exports = router; 