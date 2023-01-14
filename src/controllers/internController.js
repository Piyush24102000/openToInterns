const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validator = require('validator')
const { isValidUrl } = require("../validator/validator")

const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, mobile, email, collegeName } = data;

        //////////////////////// Validations ////////////////////////////
        let lowerCollegeName = collegeName.toLowerCase()
        //data.collegeName = lowerCollegeName
        if (!data) return res.status(400).send({ status: false, msg: "Request body can't be empty" })
        if (!name) return res.status(400).send({ status: false, msg: "name is mandatory" })

        if (!mobile) return res.status(400).send({ status: false, msg: "Mobile number is mandatory" })
        let checkMobile = await internModel.findOne({ mobile: mobile })
        if (checkMobile) return res.status(403).send({ status: false, msg: "Mobile Number is already exist" })
        if (mobile.length > 10 || mobile.length < 10) return res.status(403).send({ status: false, msg: "mobile Number format is not valid" })

        if (!email) return res.status(400).send({ status: false, msg: "email is mandatory" })
        if (!validator.isEmail(email)) return res.status(400).send({ status: false, msg: "email is Invalid" })
        let findEmail = await internModel.findOne({ email: email })
        if (findEmail) return res.status(403).send({ status: false, msg: "Email Id already exist" })

        if (!collegeName) return res.status(400).send({ status: false, msg: "collegeName is mandatory" })
        if (!collegeName) return res.status(400).send({ status: false, msg: "College Not found" })

        ///////////////////////Business Logic/////////////////////////
        let collegeId = await collegeModel.findOne({ name: lowerCollegeName, isDeleted: false }).select({ _id: 1 })
        if (!collegeId) return res.status(404).send({ status: false, message: "No college found with this name" })
        data.collegeId = collegeId._id
        let internData = await internModel.create(data)
        res.status(201).send({ status: true, data: internData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports = { createIntern }