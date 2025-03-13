const express = require('express');
const { createUser, handleLogin } = require('../controllers/userController');
const { createIncomingdocument, getIncomingdocument, deleteIncomingdocument, editIncomingdocument } = require('../controllers/incomingdocumentController');
const { createOutgoingdocument, getOutgoingdocument, deleteOutgoingdocument, editOutgoingdocument } = require('../controllers/outgoingdocumentController');
const { getSchedules, createSchedule } = require('../controllers/scheduleController');
const { searchIncomingdocument } = require('../controllers/searchController');

const routerAPI = express.Router();

routerAPI.get("/", (req, res) => {
	return res.status(200).json("Hello world api")
})


routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)
routerAPI.post("/incomingdocument", createIncomingdocument)
routerAPI.get("/incomingdocument", getIncomingdocument)
routerAPI.delete("/incomingdocument", deleteIncomingdocument)
routerAPI.put("/incomingdocument/:id", editIncomingdocument)
routerAPI.post("/outgoingdocument", createOutgoingdocument)
routerAPI.get("/outgoingdocument", getOutgoingdocument)
routerAPI.delete("/outgoingdocument", deleteOutgoingdocument)
routerAPI.put("/outgoingdocument/:id", editOutgoingdocument)
routerAPI.get("/schedule", getSchedules)
routerAPI.post("/schedule", createSchedule)
routerAPI.post("/search", searchIncomingdocument)



module.exports = routerAPI; //export default