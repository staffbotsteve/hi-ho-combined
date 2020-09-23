const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  jobId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  snippet: {
    type: String,
    require: true,
  },
  job_age: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  posted_time: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("Jobs", jobSchema);
