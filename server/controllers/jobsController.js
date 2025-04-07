import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
import userModel from "../models/userModel.js";
import profileModel from "../models/profileModel.js";
// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
  const {formData } = req.body;
  formData.createdBy = req.user._id;
  console.log(formData)
  const job = await jobsModel.create(formData);
  res.status(201).json({ job });
};
export const getMyJobsController = async (req, res, next) => {
 try {
   const myjobs = await jobsModel.find({createdBy:req.user._id});
   res.status(201).json(myjobs)
  
 } catch (error) {
  res.send(500,"internal server error")
 }
};

// ======= GET JOBS ===========
export const getAllJobsController = async (req, res, next) => {
  
  try {
    const jobs = await jobsModel.find({}).sort({ createdAt: "-1" });
    res.status(201).json(jobs)
   
  } catch (error) {
   res.send(500,"internal server error")
  }
};
export const JobIdController = async(req,res,next)=>{
  const { id } = req.params;
  //find job
 const data= await jobsModel.findOne({ _id: id });
 if(data){
  res.status(200).send({ ok: true });
}else{
   res.status(200).send({ ok: false });

 }
};

// ======= UPDATE JOBS ===========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const {formData} = req.body;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user._id === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findByIdAndUpdate(id, formData
    , {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

// ======= DELETE JOBS ===========
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No Job Found With This ID ${id}`);
  }
  if (!req.user._id === job.createdBy.toString()) {
    next("Your Not Authorize to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

export const filterJob = async (req,res)=>{
  try{
 const  {checked,selected} = req.body;
 let filteredJob;
 let args ={}
 if(checked.includes("full-time")){
   args.jobType="full-time"
 }
 if(checked.includes("internship")){
  if(checked.includes("full-time")){
    args.jobType =["internship","full-time"]
    
  }else{
   args.jobType ="internship"
  }
  }
  if(checked.includes("Remote")){
    args.workLocation = "Remote"
  }
  if(checked.includes("latest")){
    filteredJob = await  jobsModel.find(args)
    .sort({ updatedAt: -1 }) // Sort by updatedAt field in descending order
    .limit(10); // Limit the number of results to 10
  }else{
    filteredJob = await  jobsModel.find(args)
  }
  console.log(args)
  res.status(200).json({ success: true, data: filteredJob });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
}
}

export const getPhotoController =async (req,res)=>{
  const {id}=req.body
    const data = await userModel.findOne({_id:id}) 
     res.status(201).json(data.photo)
   
}
// search Job
export const searchJobController = async (req, res) => { 
  try {
    const { keyword, jobtype, profession } = req.body;

    // Build the query object
    const query = {};

    if (profession) {
      query.$or = [
        { requiredSkills: { $regex: profession, $options: "i" } },
        { description: { $regex: profession, $options: "i" } },
      ];
    }

    if (keyword) {
      query.$and = [
        { $or: [
            { requiredSkills: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { jobrole: { $regex: keyword, $options: "i" } },
            { workLocation: { $regex: keyword, $options: "i" } },
            { company: { $regex: keyword, $options: "i" } },
          ],
        },
      ];
    }

    if (jobtype) {
      query.jobType = { $regex: jobtype, $options: "i" };
    }

    // Fetch results from the database
    const results = await jobsModel.find(query).sort({ createdAt: "-1" });

    // Send the results as the response
    console.log(query)
    res.status(201).json(results)
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Unable to apply filter",
      error,
    });
  }
};

export const postApplicationController = async (req,res)=>{
  try {
    const {jobId} =req.body;
    const userid =req.user._id;
  if(jobId){
   const jobinfo = await jobsModel.findOne({_id:jobId});
  let arr = jobinfo.applications;
  const correct = arr.find(elem =>elem===userid)
  if(correct){
    return res.status(200).send({success:true, message: "You have already applied" });
  }
   arr =[...arr,userid]
    await jobsModel.findByIdAndUpdate(jobId,{applications:arr});
    res.status(200).send({success:true, message: "Your Application has been sent" });
  }
} catch (error) {
  res.status(400).send({
    success: false,
    message: "Sorry! your Application has not been sent",
 
  });
}
}
export const getApplicationController = async (req,res)=>{
     try {
      const data = await jobsModel.find({applications:req.user._id});
      res.status(201).json(data);
      
     } catch (error) {
      res.status(400).send({
        success: false,
        message: "Sorry! Applications not found",
     
      });
     }
}
export const getApplicantController = async (req,res)=>{
     try {
      const { id } = req.params;
      let profilesArr =[];
      const data = await jobsModel.findOne({_id:id});
     // res.status(201).json(data);
     for (let elem of data.applications) {
      const profile = await profileModel.findOne({createdBy:elem});
        const impInfo = {
          _id :profile._id,
          name :profile.name,
          college :profile.college,
          skills :profile.skillsArr,
          experience :profile.experience,
          portfolio :profile.portfolio,
        }
        profilesArr.push(impInfo);
      }
      res.status(201).json(profilesArr);
      
     } catch (error) {
      res.status(400).send({
        success: false,
        message: "Sorry! Applicants not found",
     
      });
     }
}

/*
// =======  JOBS STATS & FILTERS ===========
export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    // filteration - from job schema, find out the jobs that are created by reqeusted user
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    //aggregate(total) of active jobs(by checking status and adding all active jobs)
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //monthly yearly stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
};
*/