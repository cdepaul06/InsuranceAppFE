import React, { useState, useMemo } from "react";
import Navigation from "../Navigation/Navigation";

const AdminLayout = ({}) => {
  const [gridRender, setGridRender] = useState(null);

  // * Memoize the grid component to prevent re-renders
  const GridComponent = useMemo(() => {
    return gridRender;
  }, [gridRender]);

  // TODO: Come back and create a render method to display the initial dashboard (user count, policy count, etc.)

  return (
    <div className='flex h-screen w-full'>
      <div className='w-[10%] border-r border-solid border-cyan-500'>
        <div className='flex justify-center'>
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
