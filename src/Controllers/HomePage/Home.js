const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported

// Dashboard Summary API
router.get("/TrolleyLiveStatus", async (req, res) => {
  try {
    const sqlRequest = new sql.Request(); // ✅ renamed

    const result = await sqlRequest.execute(
      "SP_Dashboard_TrolleyLiveStatus"
    );

    const data = {
      locationStatus: result.recordsets[0][0],
      breakdown: result.recordsets[1][0],
      repairedToday: result.recordsets[2][0]?.RepairedToday ?? 0,
      pmCompletedToday: result.recordsets[3][0]?.PMCompletedToday ?? 0,
    };

    middlewares.standardResponse(res, data, 200, "success");
  } catch (err) {
    console.error("Dashboard summary error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching dashboard summary"
    );
  }
});

//------3rd chart locationwise hourly trend--
router.get("/TrolleyLocationHourlySummary", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.execute(
      "SP_Dashboard_TrolleyGenealogy_LocationHourly_All"
    );

    const hourlyRows = result.recordsets[0];
    const totalRows = result.recordsets[1];

    // Transform into frontend-friendly structure
    const responseData = [];

    totalRows.forEach(total => {
      const hourly = hourlyRows
        .filter(h => h.LocationStatus === total.LocationStatus)
        .map(h => ({
          hour: h.Hour,
          value: h.HourlyCount,
        }));

      responseData.push({
        locationStatus: total.LocationStatus,
        locationName: total.LocationName,
        total: total.TotalCount,
        hourly,
      });
    });

    res.json({
      status: 200,
      message: "success",
      data: responseData,
    });
  } catch (error) {
    console.error("Location hourly summary error:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
});

//total dupliucate and wrong movements

router.get("/TrolleyTotalDuplicateWrongMovement", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.execute(
      "SP_Dashboard_Trolley_Total_Duplicate_WrongMovement"
    );

    res.status(200).json({
      status: 200,
      message: "success",
      data: result.recordset[0],
    });
  } catch (error) {
    console.error("Abnormal movement summary error:", error);
    res.status(500).json({
      status: 500,
      message: "Error fetching abnormal movement summary",
      data: null,
    });
  }
});

//
// ---------------- Total duplicate and wrong Movement (Location Wise) chart ----------------
router.get("/TrolleyDupWrongMovementLocationWise", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.execute(
      "SP_Dashboard_Duplicate_WrongMovement_LocationWise"
    );

    res.status(200).json({
      status: 200,
      message: "success",
      data: {
        duplicate: result.recordsets[0], // Location-wise duplicate
        wrong: result.recordsets[1],     // Location-wise wrong
      },
    });
  } catch (error) {
    console.error("Duplicate and Wrong movement location wise error:", error);
    res.status(500).json({
      status: 500,
      message: "Error fetching Duplicate and Wrong movement location wise",
      data: null,
    });
  }
});
module.exports = router;
