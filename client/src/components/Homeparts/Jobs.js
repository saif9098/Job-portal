import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import JobInfo from "./JobInfo";
import { useSearch } from "../../context/nav";
import "../../styles/Homepage.css"
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Spinner from "../shared/Spinner";
const Jobs = () => {
  const initialjobs = []
  const [jobs, setjobs] = useState(initialjobs)
  const [search, setSearch] = useState("")
  const [yes, setYes] = useState(false);
  const [key, setKey] = useSearch()
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);
  useEffect(() => {
    console.log(key)
  }, [key])
  const getjobs = async () => {
    try {
      dispatch(showLoading())
      let resp = await axios.get("https://career-jump-server.onrender.com/api/v1/job/get-job");
      setjobs(resp.data)
      dispatch(hideLoading())
    } catch (error) {

      toast.error(error.response.data.message);
      console.log(error);
    }

  }


  const searchJob = async () => {
    try {

      let { data } = await axios.post("https://career-jump-server.onrender.com/api/v1/job/search-job", { jobtype:key.jobtype,profession:key.profession, keyword: search });;
      setjobs(data)
      toast.success("Filter Applied Successfully ");
    } catch (error) {

      toast.error(error.response.data.message);
      console.log(error);
    }

  }
  const arrCnvrt = (str) => {
    return str.split(',').map(item => item.trim())
  }
  const setjobdetail = (job) => {
    localStorage.setItem("jobinfo", JSON.stringify(job))
    setYes(!yes)
  }
  useEffect(() => {

    if ((key.jobtype == "") && (key.profession == "")) {
      if(search==""){
      getjobs()
      }
    } else {
      if(search==""){
      searchJob()
      }
    }
  }, [key,search])
 

  return (<>
    <div className="jobsbox" >
    <div className="bg-body-tertiary jobhead">Recommended jobs</div>
    {loading? (<Spinner/>):<>
      <div className="jobslist">
      
          <div className="d-flex flex-wrap m-3 justify-content-between">
            <div className="mt-2 text-blue fw-bold">{jobs.length != 0 ? `${jobs.length} jobs available` : "No job found"}</div>
            <div className="d-flex">
              <input
                className="form-control form-control-sm "
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-sm btn-outline-primary" onClick={() => searchJob()}>
                Search
              </button>
            </div>
          
        </div>
       
        {jobs?.map((p) => (
          <div>
            <div className="border rounded-3 m-2" id="box" >

              <div className="p-3 w-100">
                <div className="d-flex justify-content-between fontsmall">
                  <div><p className="fontset">{p.jobType}</p></div>
                  <div className="fontsmall"><p><i class="fa-solid fa-location-dot"></i> {p.workLocation}</p></div>
                </div>
                <div className="text-primary fw-bold fontsmall">{p.jobrole}</div>
                <div className="fs-6 fw-bold "><p>{p.company}</p></div>
                <div className="d-flex flex-wrap fw-bold fontsmall">Required Skills :
                  {arrCnvrt(p.requiredSkills)?.map((elem) => (
                    <p className="mx-1 fw-normal fontset">{elem}</p>
                  ))
                  }
                </div>
                <div className="d-flex justify-content-between ">
                  <div className="fs-6"><p>Posted On: <span className="text-primary">{moment(p.createdAt).fromNow()}</span></p></div>
                  <div> <button className="btn btn-outline-primary btn-sm fontsmall" onClick={() => setjobdetail(p)}>View Details</button></div>
                </div>



              </div>
            </div>
          </div>
        ))}
      
     
        </div>
      </>}
    </div>
    <div className="jobdetail">
      <JobInfo yes={yes} />
    </div>
  </>
  )
}

export default Jobs
