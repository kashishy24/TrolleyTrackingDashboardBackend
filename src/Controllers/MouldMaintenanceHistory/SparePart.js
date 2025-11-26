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

module.exports = router; 