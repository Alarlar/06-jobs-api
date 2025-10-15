const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs"); // Из контроллеров вытаскивыем функции

router.route("/").post(createJob).get(getAllJobs); // REST api, web server handling HTTP requests
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
