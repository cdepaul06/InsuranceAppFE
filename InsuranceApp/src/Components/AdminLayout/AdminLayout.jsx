import React, { useState, useMemo } from "react";
import Navigation from "../Navigation/Navigation";

const AdminLayout = ({}) => {
  const [gridRender, setGridRender] = useState(null);

  // * Memoize the grid component to prevent re-renders
  const GridComponent = useMemo(() => {
    return gridRender;
  }, [gridRender]);

  return (
    <div className='flex h-screen w-full overflow-auto'>
      <div className='w-[10%] bg-cyan-800'>
        <div className='flex justify-center p-2 overflow-scroll'>
          <Navigation layout={"admin"} setGridRender={setGridRender} />
        </div>
      </div>
      <div className='w-[90%] p-3'>
        <div className='flex justify-center h-full'>
          {GridComponent && <GridComponent />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
