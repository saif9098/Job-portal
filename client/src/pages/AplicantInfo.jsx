import React, { useEffect, useState } from 'react'
import '../styles/Resumepage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'

const AplicantInfo = () => {
    const {id}=useParams();
    const [profilResp, setProfilResp] = useState([]);
    const [ok ,setok]=useState(false)
    const getprofile = async () => {

        let resp = await axios.get(`https://career-jump-server.onrender.com/api/v1/profile/applicant-profile/${id}`);
        if(resp.data!="noProfile"){
            setProfilResp(resp.data)
            setok(true)
        }
    
      }
      useEffect(() => {
        getprofile()
      }, [])
  return (
    <Layout>
    <div className="">
    {ok?(
        <div>
            <div className='resumeCard' >
                <div className="d-flex flex-wrap justify-content-between">
                    <div className="d-flex flex-wrap gap-3">
                        <div className="fs-5 text-dark fw-bold">{profilResp.college}</div>
                        <div className="fs-5"><p>{profilResp.jobType} ( <i class="fa-solid fa-location-dot"></i> {profilResp.city})</p></div>
                    </div>

                    <div>
                        <h5>{profilResp.startyr}-{profilResp.endyear}</h5>
                    </div>
                </div>

                <div className="">
                    <h5><span className='fw-bold'>Course : </span>{profilResp.course}({profilResp.stream ? profilResp.stream : "Main"})</h5>
                    <h5>Aggregate : {profilResp.marks}</h5>
                </div>
            </div>
            <div className='resumeCard' >

                <h5>About</h5>
                <p>{profilResp.about}</p>
            </div>
            <div className='resumeCard' >
                <h5>Skills & Portfolio</h5>
                <div className='d-flex flex-wrap gap-2'>
                    {profilResp.skillsArr?.map((skill) => (
                        <p className="mx-1 fw-normal skillfont">{skill}</p>
                    ))}
                </div>
                <div className="fw-bold">Portfolio : <Link to={`https://${profilResp.portfolio}`}><i class="fa-solid fa-globe"></i> {profilResp.portfolio}</Link></div>
            </div>
            <div className='resumeCard' >

                {profilResp.resume ? (
                    <iframe
                        src={profilResp.resume}
                        title="PDF Viewer"
                        width="98%"
                        height="800px"
                    />
                ) : (
                    <p>Loading resume...</p>
                )}

            </div>
        </div>
           ): <><div className='fs-1 w-100 d-flex justify-content-center align-items-center' style ={{height:"90vh"}}>
            <p> Profile not found  <i class="fa-regular fa-face-frown"></i></p>
        </div></>    }


</div>
    </Layout>
  )
}

export default AplicantInfo
