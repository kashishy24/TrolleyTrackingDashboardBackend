const express = require("express");
const sql = require("mssql");
const router = express.Router();


router.get("/SparePartCategoryName", async (req, res) => {
  try {
    const pool = await sql.connect();
    const query = `
      SELECT 
        SparePartCategoryID,
        SparePartCategoryName,
        LastUpdatedTime,
        LastUpdatedBy
      FROM [PPMS_LILBawal].[dbo].[Config_SparePartCategory]
      ORDER BY SparePartCategoryID ASC
    `;

    const result = await pool.request().query(query);

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error fetching Spare Part Category:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching spare part category data",
      error: error.message,
    });
  }
});

router.get("/SparePartName", async (req, res) => {
  try {
    const pool = await sql.connect();
    const query = `
      SELECT  [SparePartID]
      ,[SparePartName]
      ,[SparePartDescription]
      ,[SparePartCategoryID]
      ,[MouldGroupID]
      ,[MouldName]
      ,[NoOfMould]
      ,[SparePartSize]
      ,[SparePartLoc]
      ,[MinQuantity]
      ,[MaxQuantity]
      ,[ReorderLevel]
      ,[SparePartMake]
      ,[LeadTime]
      ,[ImportExport]
      ,[PackingQuantity]
      ,[PreferredSparePart]
      ,[LastUpdatedTime]
      ,[LastUpdatedBy]
  FROM [PPMS_LILBawal].[dbo].[Config_Mould_SparePart] ASC
    `;

    const result = await pool.request().query(query);

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error fetching Spare Part :", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching spare part  data",
      error: error.message,
    });
  }
});


// GET Spare Part Consumption By Category (Custom Date)
router.get("/DashboardSpareConsumptionByCategory", async (req, res) => {
  try {
    const { startDate, endDate, sparePartCategoryID } = req.query;

    // ----------- VALIDATION -----------
    if (!startDate || !endDate || !sparePartCategoryID) {
      return res.status(400).json({
        success: false,
        message: "startDate, endDate, and sparePartCategoryID are required",
      });
    }

    const pool = await sql.connect();
    const request = pool.request();

    // ----------- INPUT PARAMETERS -----------
    request.input("StartDate", sql.Date, startDate);
    request.input("EndDate", sql.Date, endDate);
    request.input("SparePartCategoryID", sql.Int, sparePartCategoryID);

    // ----------- EXECUTE STORED PROCEDURE -----------
    const result = await request.execute(
      "DASHBOARD_SparePartConsumptionByCategoryCustomedate"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error(
      "Error fetching DASHBOARD_SparePartConsumptionByCategoryCustomedate:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Error fetching Spare Part Consumption (Category-wise)",
      error: error.message,
    });
  }
});

// GET Top 50 Spare Part Consumption (Custom Date Range)
router.get("/DashboardTop50SpareConsumption", async (req, res) => {
  try {
    const { startDate, endDate, sparePartCategoryID } = req.query;

    // ------------------ Validation ------------------
    if (!startDate || !endDate || !sparePartCategoryID) {
      return res.status(400).json({
        success: false,
        message: "startDate, endDate, and sparePartCategoryID are required",
      });
    }

    const pool = await sql.connect();
    const request = pool.request();

    // ------------------ Input Parameters ------------------
    request.input("StartDate", sql.Date, startDate);
    request.input("EndDate", sql.Date, endDate);
    request.input("SparePartCategoryID", sql.Int, sparePartCategoryID);

    // ------------------ Execute Stored Procedure ------------------
    const result = await request.execute(
      "DASHBOARD_Top50SparePartConsumptionCustomDate"
    );

    return res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error(
      "Error fetching Top 50 Spare Part Consumption:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Error fetching Top 50 Spare Part Consumption",
      error: error.message,
    });
  }
});

module.exports = router; 