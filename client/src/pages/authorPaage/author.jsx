import React, { useState } from 'react'
import logo from '../../components/Logo/nouser.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';
const Author = () => {
    const [search, setSearch]=useState("");
   const [data,setData]=useState([]);
  const searchUsers =async()=>{
 const userInfo = await axios.get(`https://career-jump-server.onrender.com/api/v1/user/users/${search}`);
 setData(userInfo.data)
  }
  const makeAdmin =async(id)=>{
 await axios.put(`https://career-jump-server.onrender.com/api/v1/user/update-role/${id}`);
 toast.success("Admin Assigned Successfully")
 searchUsers();
  }
  const maskPhoneNumber = (phone) => {
    if (!phone) return phone;
    return `${phone.slice(0, 3)}****${phone.slice(7)}`;
  };
    
  return (
    <div>
     <div className="d-flex gap-3 justify-center p-5 mx-5">
              <input
                className="form-control form-control " 
            
                type="search"
                placeholder="Search by Name, Email or Phone"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}  
              />
            
              <button className="btn btn-sm btn-outline-primary" onClick={()=>searchUsers()} >
                Search
              </button>
            </div>
      {data?.map((u)=>(

            <div className='bg-white rounded-3 p-3 mb-2 mx-4'>
             <div className='d-flex gap-3'>
             <div><img src={u.photo||logo} 
                alt="logo"
                height={70}
                width={70}
                /></div>
            <div className='w-100'>
                  <div className="fs-6 fw-bold">Name: <span className="text-primary">{u.name} {u.lastName}</span></div>
                  <div className="fs-6 fw-bold">Email: <span className="text-secondary">{u.email}</span></div>
                  <div className='d-flex flex-wrap justify-content-between'>
                  <div className="fs-6 fw-bold">Phone: <span className="text-secondary">{maskPhoneNumber(u.phone)}</span></div>
                  {u.role===1?(
<button className='btn btn-sm btn-white' disabled>Admin Assigned</button>
                  ): ( <button className='btn btn-sm btn-outline-info' onClick={()=>makeAdmin(u._id)}>Promote to Admin</button>)}
                  </div>
            </div>
             </div>
            </div>
      ))}
    </div>
  )
}

export default Author
