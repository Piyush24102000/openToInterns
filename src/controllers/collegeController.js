const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require('validator')
const { isValidUrl } = require("../validator/validator")

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: "Please give some data" }) }

        //////////////////////// Validations ////////////////////////////
        let { name, fullName, logoLink, isDeleted } = data
        let lowerName = name.toLowerCase()
        data.name = lowerName
        if (!name) return res.status(400).send({ status: false, msg: "name is mandatory" })
        if (!fullName) return res.status(400).send({ status: false, msg: "fullName is mandatory" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is mandatory" })
        if (!isValidUrl(logoLink)) return res.status(400).send({ status: false, msg: "Please enter valid link" })

        ///////////////////////Business Logic/////////////////////////
        let collegeExists = await collegeModel.findOne({ name: data.name })
        if (collegeExists) return res.status(400).send({ status: false, msg: "college already exist" })

        let collegeData = await collegeModel.create(data)
        res.status(201).send({ status: true, data: collegeData })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
const getCollege = async function (req, res) {
    try {
        //////////////////////// Validations ////////////////////////////
        let query = req.query
        let lowerCollegeName = (query.collegeName).toLowerCase()
        //handle the query edge cases
        ///////////////////////Business Logic/////////////////////////
        let findCollege = await collegeModel.findOne({ name: lowerCollegeName })
        if (!findCollege) return res(404).send("College Not Found")
        let findIntern = await internModel.find({ collegeId: findCollege._id })
        if (!findIntern) return res(404).send({status:false,data:"Intern Not Found"})
        res.status(200).send({
            status: true,
            data:
            {
                name: findCollege.name,
                fullName: findCollege.fullName,
                logoLink: findCollege.logoLink,
                interns: findIntern
            }
        })

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports = { createCollege, getCollege }