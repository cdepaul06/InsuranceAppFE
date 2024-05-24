import React, { useState, useCallback, useMemo } from "react";
import Navigation from "../Navigation/Navigation";
import Grid from "../Grid/Grid";

const AdminLayout = ({}) => {
  const [gridList, setGridList] = useState(null);

  const GridListComponent = useMemo(() => {
    return gridList;
  }, [gridList]);

  return (
    <div className='flex h-screen w-full overflow-auto'>
      <div className='w-[10%] bg-cyan-800'>
        <div className='flex justify-center p-2 overflow-scroll'>
          <Navigation layout={"admin"} setGridList={setGridList} />
        </div>
      </div>
      <div className='w-[90%] p-3'>
        <div className='flex justify-center h-full'>
          {GridListComponent && <GridListComponent />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
