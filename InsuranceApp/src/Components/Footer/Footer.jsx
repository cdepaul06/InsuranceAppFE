import React from "react";

const Footer = () => {
  return (
    <footer className='bg-zinc-900 text-white text-center p-3 fixed bottom-0 w-full'>
      <p>
        UI {import.meta.env.VITE_FRONTEND_VERSION} API{" "}
        {import.meta.env.VITE_BACKEND_VERSION}
      </p>
    </footer>
  );
};

export default Footer;
