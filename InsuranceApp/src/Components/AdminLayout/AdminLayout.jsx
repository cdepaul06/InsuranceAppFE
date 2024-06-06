import React, { useState, useMemo } from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const AdminLayout = () => {
  const [gridRender, setGridRender] = useState(null);

  // Memoize the grid component to prevent re-renders
  const GridComponent = useMemo(() => {
    return gridRender;
  }, [gridRender]);

  // TODO: Come back and create a render method to display the initial dashboard (user count, policy count, etc.)

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <div className='w-[10%] bg-zinc-900 h-full'>
          <Navigation layout={"admin"} setGridRender={setGridRender} />
        </div>
        <div className='flex-1 p-3'>
          <div className='flex justify-center h-full'>
            {GridComponent && <GridComponent />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
