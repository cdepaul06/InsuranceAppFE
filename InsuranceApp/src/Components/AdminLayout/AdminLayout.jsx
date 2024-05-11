import React from "react";
import Navigation from "../Navigation/Navigation";

const AdminLayout = ({}) => {
  return (
    <div className='flex h-screen w-full overflow-auto'>
      <div className='w-[25%] bg-cyan-800'>
        <div className='flex justify-start p-2 overflow-scroll'>
          <Navigation layout={"admin"} />
        </div>
      </div>
      <div className='w-[75%]'>
        <div className='flex justify-center items-center h-full'>
          <span className='text-3xl'>Admin Dashboard</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
