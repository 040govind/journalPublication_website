import React, { useState, useEffect } from "react";
import "../style/profile.css";
import img from "../img/customer-3.jpg";
import Circle from "../component/Circle";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isReadOnly, setReadOnly] = useState(true);
  const getUser = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      };
      const {data} = await toast.promise(
        axios.get("http://localhost:5000/api/v1/author/getUserProfile", {
          headers,
        }),
        {
          pending: "Data Fetching in progress...",
          success: "Data Fetched successfully",
          error: "Unable to Fetch Data",
          loading: "Fetching Data in progress...",
        }
      );
      console.log(data.data);
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const inputChange = ()=>{

  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <section className="register-section flex-center">
        <div className="profile-container flex-center">
          <h2 className="form-heading">Profile</h2>
          <img src={img} alt="profile" className="profile-pic" />
          <form className="register-form">
            <div className="form-same-row">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder=""
                value={userData?.name || ""}
                onChange={inputChange}
              />
              
            </div>
            <div className="form-same-row">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={userData?.email || ""}
                onChange={inputChange}
              />
            </div>
            <div className="form-same-row">
              <input
                type="text"
                name="qualification"
                className="form-input"
                placeholder="Enter your qualification number"
                value={userData?.qualification || ""}
              onChange={inputChange}
              />
            </div>
            <div className="form-same-row">
              <input
                type="text"
                name="reviewer"
                className="form-input"
                placeholder="Enter your reviewer number"
                value={userData?.isReviewer ? "Yes" : "No"}
                onChange={inputChange}
              />
            </div>
            <button onClick={() => setReadOnly(false)} className="btn form-btn">
              Edit Profile
            </button>
          </form>
        </div>
      </section>
      <div className="">
        <Circle count={userData?.journalCounts}/>
      </div>
    </>
  );
};

export default Profile;
