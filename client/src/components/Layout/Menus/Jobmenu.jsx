import React from 'react'
import { NavLink } from 'react-router-dom'

const Jobmenu = () => {
  return (
    <>
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4 className='bg-dark text-light p-1 mt-2'>HR Panel</h4>
        <NavLink
          to="/dashboard/update-jobs"
          className="list-group-item list-group-item-action"
        >
          Upadate Job
        </NavLink>
        <NavLink
          to="/dashboard/post-jobs"
          className="list-group-item list-group-item-action"
        >
         Post Job
        </NavLink>
        
        <NavLink
          to="/dashboard/delete-jobs"
          className="list-group-item list-group-item-action"
        >
          Delete Job
        </NavLink>
      </div>
    </div>
  </>
  )
}

export default Jobmenu
