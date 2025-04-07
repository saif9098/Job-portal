import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Profile from '../components/ResumeParts/profile'
import { toast } from 'react-toastify';

const JobInfoPage = () => {
    const {id}=useParams()
    const [ok, setok] = useState(false);
    const [pic, setpic] = useState("")
    let jobinfo = localStorage.getItem("jobinfo");
    const job = JSON.parse(jobinfo)
    const getphto = async() => {
        const {data}= await axios.post('https://career-jump-server.onrender.com/api/v1/job/get-photo',{id:job.createdBy})
        setpic(data)
    }
    
    useEffect(() => {
        if (jobinfo) {
            if(id===job._id){
            setok(true)
            getphto()
            }
        }
    }, [])
    const arrCnvrt = (str) => {
        return str.split(',')
      }
      const arrCnvrt2 = (str) => {
        return str.split('.').filter(item => item !== '');
      }
  return (
    <Profile>
    <div style={{background:"rgb(243, 244, 247)"}}>
    {ok ? <>
        <div className="m-3 bg-white p-3 rounded-3 ">
            <div className="d-flex flex-wrap gap-4 mb-2">
                <div><img src={pic} 
                alt="logo"
                height={130}
                width={125}
                /></div>
                <div>
                    <div className="fs-3 fw-bold">{job.jobrole}</div>
                    <div className="fs-5">{job.company}</div>
                </div>
            </div>
            <div><p><i class="fa-solid fa-location-dot"></i> {job.workLocation}</p></div>
            <div><p><Link to={`https://${job.Yourweb}`}><i class="fa-solid fa-globe"></i> {job.Yourweb}</Link></p></div>

            <div className="d-flex flex-wrap justify-content-between">
                <div><p><i class="fa-regular fa-calendar"></i> Posted On : {moment(job.createdAt).fromNow()}</p></div>
                <div><button className='btn btn-primary' onClick={()=>toast.success("Already Applied")}>Apply</button></div>
            </div>
        </div>
        <div className="m-3 bg-white p-3 rounded-3">
         <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex flex-wrap gap-3">
                <div className='px-3 fs-4 rounded-4 pt-1' style={{background:"#e9ebee"}}><i class="fa-solid fa-people-group"></i></div>
                <div>
                    <div className="fs-6 fw-bold">Applicants</div>
                    <div className="fs-6">{job.applications.length}</div>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3">
                <div className='px-3 fs-4 rounded-4 pt-1' style={{background:"#e9ebee"}}><i class="fa-regular fa-calendar"></i></div>
                <div>
                    <div className="fs-6 fw-bold">Application deadline</div>
                    <div className="fs-6">{job.deadline}</div>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3">
                <div className='px-3 fs-4 rounded-4 pt-1' style={{background:"#e9ebee"}}><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                <div>
                    <div className="fs-6 fw-bold">Impressions</div>
                    <div className="fs-6">123..</div>
                </div>
            </div>
         </div>

        </div>
     
        <div className="m-3 bg-white p-3 rounded-3">
        <div >
        <div className="fs-4 fw-bold ">Eligibility</div>
        <div className="d-flex flex-wrap mt-2"> {arrCnvrt(job.eligibility)?.map((elem)=>(
            <p className="infofontset mx-1">{elem}</p>
        ))
                }</div>
        </div>
        <div >
        <div className="fs-4 fw-bold ">Skills</div>
        <div className="d-flex flex-wrap mt-2"> {arrCnvrt(job.requiredSkills)?.map((elem)=>(
            <p className="infofontset mx-1">{elem}</p>
        ))
    }</div>
    </div>
    
    </div>
        <div className="m-3 bg-white p-3 rounded-3">
       
        <div className="fs-4 fw-bold ">Job Description and Responsibilities</div>
        <div className="d-flex flex-wrap mt-2"> <ul className="fw-normal fs-6">
        {arrCnvrt2(job.jobDescription)?.map((elem)=>(
          <li>{elem}</li>
          ))
          }
          </ul></div>
    
    
    </div>
    <div className="m-3 bg-white p-3 rounded-3">
    <div className="fs-4 fw-bold">Addional Details</div>
                <div className='border rounded-3 m-3 p-2'>
                    <div className="fs-5 fw-bold">Salary/Stipend</div>
                    <div className="fs-6">Salary/Stipend : {job.salary}</div>
                </div>
                <div className='border rounded-3 m-3 p-2'>
                    <div className="fs-5 fw-bold">Job Type/Timing</div>
                    <div className="fs-6">Job Type/Timing : {job.jobType}</div>
                </div>
       
                <div className='border rounded-3 m-3 p-2'>
                    <div className="fs-4 fw-bold">Work Detail</div>
                    <div className="fs-6">Working Days : {job.workDays}</div>
                </div>
        </div>
        </> :
        <><div className='fs-1 w-100 h-100 d-flex justify-content-center align-items-center'>
        <p> There is nothing to display  <i class="fa-regular fa-face-frown"></i></p>
        </div></>}
        
        </div>
    
    </Profile>
  )
}

export default JobInfoPage
