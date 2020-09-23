const Jobs = require("../models/Jobs");

module.exports.saveJobs = (req, res) => {
  const jobDetails = req.body;
  Jobs.create(jobDetails, (err, data) => {
    console.log("jobdetails", jobDetails)
    if (err) throw err;
    module.exports.getJobs(req,res)
  });
};

module.exports.getJobs = (req, res) => {
  const id = req.params.id;
  Jobs.find({userId: id}, (err, data) => {
    if (err) throw err;
    res.json({
      success: true,
      data,
    });
  });
};

module.exports.deleteJobs = (req, res) => {
  const id = req.params.id;
  Jobs.deleteOne(res.id, (err, data) => {
    if (err) throw err;
    res.json({
      success: true,
      data,
    });
  });
};
