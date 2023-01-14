const express = require("express")
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

const router = express.Router()

router.post("/functionup/colleges",collegeController.createCollege)
router.get("/functionup/collegeDetails",collegeController.getCollege)
router.post("/functionup/interns",internController.createIntern)

module.exports = router

//github https://github.com/vpalve07/internshipGroup12.git