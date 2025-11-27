const express = require("express");
const sql = require("mssql");
const router = express.Router();



router.get("/MouldName", async (req, res) => {
  try {
    const pool = await sql.connect();
    const query = `
      SELECT 
        MouldID,
        MouldName
      FROM [PPMS_LILBawal].[dbo].[Config_Mould]
      ORDER BY MouldID ASC
    `;

    const result = await pool.request().query(query);

    return res.json({
      success: true,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error fetching Mould Name:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching mould data",
      error: error.message,
    });
  }
});


module.exports = router; 