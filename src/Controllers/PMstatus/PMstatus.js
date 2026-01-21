const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");
const middlewares = require("../../middlewares/middlewares"); // ✅ ensure imported


// Dashboard Summary API
router.get("/TrolleypmStatus", async (req, res) => {
    try {
        const sqlRequest = new sql.Request(); // ✅ renamed

        const result = await sqlRequest.execute(
            "SP_Dashboard_PM_Status_Summary1"
        );

        const data = {
            normal: result.recordsets[0][0]?.Normal ?? 0,
            warning: result.recordsets[0][0]?.Warning ?? 0,
            alert: result.recordsets[0][0]?.Alert ?? 0,
            alarm: result.recordsets[0][0]?.Alarm ?? 0,
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

//schudle summary

// PM Schedule Summary API
router.get("/TrolleyPMScheduleSummary", async (req, res) => {
  try {
    const sqlRequest = new sql.Request();

    const result = await sqlRequest.execute(
      "SP_Dashboard_PMScheduleSummary"
    );

    const data = {
      day: result.recordsets[0][0].DayPlanQty,
      week: result.recordsets[0][0].WeekPlanQty,
      month: result.recordsets[0][0].MonthPlanQty,
      year: result.recordsets[0][0].YearPlanQty,
    };

    middlewares.standardResponse(res, data, 200, "success");
  } catch (err) {
    console.error("PM Schedule summary error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching PM schedule summary"
    );
  }
});

//

// PM Details Table API (Date Range)
router.get("/TrolleyPMDetails", async (req, res) => {
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

    const sqlRequest = new sql.Request();
    sqlRequest.input("StartDate", sql.Date, startDate);
    sqlRequest.input("EndDate", sql.Date, endDate);

    const result = await sqlRequest.execute(
      "SP_Dashboard_PMDetails_ByDateRange"
    );

    middlewares.standardResponse(
      res,
      result.recordset,
      200,
      "success"
    );
  } catch (err) {
    console.error("PM Details error:", err);
    middlewares.standardResponse(
      res,
      null,
      300,
      "Error fetching PM details"
    );
  }
});
module.exports = router;