const express = require("express");
const { executeCode } = require("../controllers/codeExecutionController");

const router = express.Router();

router.post("/execute", executeCode);

module.exports = router;
