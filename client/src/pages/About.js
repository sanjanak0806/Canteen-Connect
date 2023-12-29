import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          The WCE Canteen Connect is a Management System for College Campus canteens.
          It is a web- based application designed to streamline and modernize the management 
          of canteens within educational institution. This system aims to provide a 
          user-friendly interface for both canteen manager and students to access and 
          interact with the canteen's menu and real-time availability information.
           This portal offers a convenient and efficient way for students to view the
            canteen's menu, and ensure that their preferred food items are available.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
