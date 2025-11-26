const express = require("express");
const sql = require("mssql");




const router = express.Router();


//Mould PM Plan Vs Actual


router.get("/mouldPMPlannedVsActual", async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;

    if (!filterType) {
      return res.status(400).json({
        success: false,
        message: "filterType parameter is required",
      });
    }

    const pool = await sql.connect();
    const request = pool.request();

    // Always send FilterType
    request.input("FilterType", sql.Int, parseInt(filterType));

    // When FilterType = 5, pass StartDate & EndDate
    if (parseInt(filterType) === 5) {
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "StartDate & EndDate required when FilterType = 5",
        });
      }

      request.input("StartDate", sql.Date, startDate);
      request.input("EndDate", sql.Date, endDate);
    } else {
      request.input("StartDate", sql.Date, null);
      request.input("EndDate", sql.Date, null);
    }

    const result = await request.execute("Dashboard_MouldPM_PlannedVsActual");

    res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error fetching PM Planned vs Actual:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching PM Planned vs Actual",
      error: error.message,
    });
  }
});


//----PM Monitoring table
router.get("/mouldPMStatus", async (req, res) => {
  try {
    const { caseType, startDate, endDate } = req.query;

    if (!caseType) {
      return res.status(400).json({
        success: false,
        message: "caseType parameter is required",
      });
    }

    const pool = await sql.connect();

    const request = pool.request();

    // Always pass CaseType
    request.input("CaseType", sql.Int, parseInt(caseType));

    // Pass StartDate & EndDate ONLY when CaseType = 5
    if (parseInt(caseType) === 5) {
      request.input("StartDate", sql.Date, startDate || null);
      request.input("EndDate", sql.Date, endDate || null);
    } else {
      request.input("StartDate", sql.Date, null);
      request.input("EndDate", sql.Date, null);
    }

    const result = await request.execute("DASHBOARD_MouldPMStatusMonitoring");

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error fetching mould PM status monitoring data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching mould PM status monitoring data",
      error: error.message,
    });
  }
});

//-----------HC Monitoring table

router.get("/mouldHCStatus", async (req, res) => {
  try {
    const { caseType, startDate, endDate } = req.query;

    if (!caseType) {
      return res.status(400).json({
        success: false,
        message: "caseType parameter is required",
      });
    }

    const pool = await sql.connect();

    const request = pool.request();

    // Always pass CaseType
    request.input("CaseType", sql.Int, parseInt(caseType));

    // Pass StartDate & EndDate ONLY when CaseType = 5
    if (parseInt(caseType) === 5) {
      request.input("StartDate", sql.Date, startDate || null);
      request.input("EndDate", sql.Date, endDate || null);
    } else {
      request.input("StartDate", sql.Date, null);
      request.input("EndDate", sql.Date, null);
    }

    const result = await request.execute("DASHBOARD_MouldHCStatusMonitoring");

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error fetching mould HC status monitoring data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching mould HC status monitoring data",
      error: error.message,
    });
  }
});

//breakdown y duration

// API: Top 5 Mould Breakdown Duration
router.get("/Top5BreakdownByDuration", async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;

    if (!filterType) {
      return res.status(400).json({
        success: false,
        message: "filterType parameter is required",
      });
    }

    const pool = await sql.connect();
    const request = pool.request();

    // Always send FilterType
    request.input("FilterType", sql.Int, parseInt(filterType));

    // When FilterType = 5, pass StartDate & EndDate
    if (parseInt(filterType) === 5) {
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "StartDate & EndDate required when FilterType = 5",
        });
      }

      request.input("StartDate", sql.Date, startDate);
      request.input("EndDate", sql.Date, endDate);
    } else {
      request.input("StartDate", sql.Date, null);
      request.input("EndDate", sql.Date, null);
    }

    const result = await request.execute("Dashboard_Top5_MouldBreakdownDuration");

    res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error fetching Breakdown duration:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Breakdown duration",
      error: error.message,
    });
  }
});

// API: Top 5 Mould Breakdown Occurence
router.get("/Top5BreakdownByOccurrences", async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;

    if (!filterType) {
      return res.status(400).json({
        success: false,
        message: "filterType parameter is required",
      });
    }

    const pool = await sql.connect();
    const request = pool.request();

    // Always send FilterType
    request.input("FilterType", sql.Int, parseInt(filterType));

    // When FilterType = 5, pass StartDate & EndDate
    if (parseInt(filterType) === 5) {
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "StartDate & EndDate required when FilterType = 5",
        });
      }

      request.input("StartDate", sql.Date, startDate);
      request.input("EndDate", sql.Date, endDate);
    } else {
      request.input("StartDate", sql.Date, null);
      request.input("EndDate", sql.Date, null);
    }

    const result = await request.execute("Dashboard_Top5_MouldBreakdownOccurrences");

    res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error fetching Breakdown duration:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Breakdown duration",
      error: error.message,
    });
  }
});


//API for spare part Monitoring

router.get("/SparePartMonitoring", async (req, res) => {
  try {
    const { caseType, startDate, endDate } = req.query;

    if (!caseType) {
      return res.status(400).json({
        success: false,
        message: "caseType parameter is required",
      });
    }

    const pool = await sql.connect();

    const request = pool.request();

    // Always pass CaseType
    request.input("CaseType", sql.Int, parseInt(caseType));

    // Pass StartDate & EndDate ONLY when CaseType = 5
    if (parseInt(caseType) === 5) {
      request.input("StartDate", sql.Date, startDate || null);
      request.input("EndDate", sql.Date, endDate || null);
    } else {
      request.input("StartDate", sql.Date, null);
      request.input("EndDate", sql.Date, null);
    }

    const result = await request.execute("DASHBOARD_MouldSparePartStatusMonitoring");

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error fetching mould spare part monitoring data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching mould spare part monitoring data",
      error: error.message,
    });
  }
});


router.get("/PmPlannedVsActualCustom", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const pool = await sql.connect();
    const request = pool.request();

    // Send parameters ONLY if provided, otherwise NULL
    request.input("StartDate", sql.Date, startDate || null);
    request.input("EndDate", sql.Date, endDate || null);

    // Execute the stored procedure
    const result = await request.execute(
      "Dashboard_MouldPM_PlannedVsActualCustomeDate"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error executing Dashboard_MouldPM_PlannedVsActualCustomeDate:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching PM Planned vs Actual (Custom Date)",
      error: error.message,
    });
  }
});

module.exports = router;