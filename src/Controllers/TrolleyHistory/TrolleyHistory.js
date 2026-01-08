// routes/trolleyRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../../database/db.js');

router.post('/TrolleyHistory', async (req, res) => {
  const { trolleyId, startDate, endDate } = req.body;

  if (!trolleyId || !startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: 'TrolleyID, StartDate and EndDate are required'
    });
  }

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input('TrolleyID', sql.NVarChar, trolleyId)
      .input('StartDate', sql.DateTime, startDate)
      .input('EndDate', sql.DateTime, endDate)
      .execute('SP_Dashboard_GetTrolleyHistory');

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset
    });

  } catch (error) {
    console.error('Trolley Genealogy API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});

module.exports = router;
