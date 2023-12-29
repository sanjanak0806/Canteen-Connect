import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      {/* <h1 className="text-center">All Right Reserved &copy; Techinfoyt</h1> */}
      <h4 className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>
        {/* <Link to="/policy">Privacy Policy</Link> */}
      </h4>
    </div>
  );
};

export default Footer;
