import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../components/shared/Spinner";
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';


const Applicants = () => {
    const initialjobs = [];
  const [jobs, setjobs] = useState(initialjobs)
  const [applicants,setApplicant]=useState([])
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);
  const navigate =useNavigate();
    const getmyjobs = async () => {

        let resp = await axios.get("https://career-jump-server.onrender.com/api/v1/job/get-myjob");
      
        setjobs(resp.data)
    
      }
      const getApplicants = async (id)=>{
      dispatch(showLoading())
      const {data} =await axios.get(`https://career-jump-server.onrender.com/api/v1/job/get-applicant/${id}`);
      
       setApplicant(data)
      dispatch(hideLoading())
    } 
    useEffect(() => {
    getmyjobs();
    }, [])

const handlePofileInfo =(id)=>{
  navigate(`/dashboard/applicantinfo/${id}`)
}

  return (<>
    <Layout>
    {loading? (<Spinner/>):
      (
    <div>
    {jobs?.map((job)=>(
        <div className='my-1 mx-2'>
        <button className="btn btn-outline-primary w-100" onClick={()=>getApplicants(job._id)}>{job.jobrole}</button>
        </div>
    ))}
    
    
    {applicants?.map((app)=>(
      <div className="m-2 p-2 border bg-white rounded-3">
      <div className="d-flex flex-wrap justify-content-between">
      <h5><span style={{color:"rgb(72,72,72)"}}>{app.name}</span> from <span style={{color:"rgb(122, 122, 124)"}}>{app.college}</span></h5>
      <h5 className='text-primary'>{app.experience}</h5>
      </div>
      
      <div className="d-flex flex-wrap gap-2">
      {app.skills.map((el)=>(
        <p className="rounded-2 px-2" style={{background: "rgb(186, 196, 218"}}>{el}</p>
      ))}
      </div>
      <div className="d-flex flex-wrap justify-content-between">
      <Link to={`https://${app.portfolio}`}>{app.portfolio}</Link>
      <button className='btn btn-outline-primary btn-sm' onClick={()=>handlePofileInfo(app._id)}>View Details</button>
      </div>
      </div>
    ))
    }
    </div>
    
  )}
  </Layout>
    </>
  )
}

export default Applicants
