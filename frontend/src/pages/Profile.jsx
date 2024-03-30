import React, { useState, useEffect } from "react";
import "../style/profile.css";
import img from "../img/customers/customer-3.jpg";
import Circle from "../component/Circle";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isReadOnly, setReadOnly] = useState(true);
  const getUser = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      };
      console.log("pppp");
      const { data } = await toast.promise(
        axios.get("http://127.0.0.1:5000/api/v1/author/getUserProfile", {
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
  useEffect(() => {
    console.log("pppp");
    getUser();
  }, []);

  return (
    <>
      <section>
        <div className="container_">
          <div className="cta">
            <div className="cta-text-box">
              <h2 className="heading-secondary">Profile</h2>

              {/* <img src={img} alt="profile" className="profile-pic" /> */}

              <form className="cta-form">
                <div>
                  <label htmlfor="name">Name</label>
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={userData?.name}
                  />
                </div>

                <div>
                  <label htmlfor="email">Email</label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={userData?.email}
                  />
                </div>

                <div>
                  <label htmlfor="qualification">Qualification</label>
                  <input
                    className="input"
                    type="text"
                    name="qualification"
                    value={userData?.qualification}
                  />
                </div>

                <div>
                  <label htmlfor="isReviewer">Are You a Reviewer</label>

                  <input
                    className="input"
                    type="text"
                    name="reviewer"
                    value={userData?.isReviewer}
                  />
                </div>

                <button
                  onClick={() => setReadOnly(false)}
                  className="submit-button"
                >
                  Edit Profile{" "}
                </button>
              </form>
            </div>
            <div
              className="profile-img"
              role="img"
              aria-label="Profile Picture"
            >
              <img src={userData?.image} alt="profile"  />
            </div>
          </div>
        </div>
      </section>
      <div className="">
        <Circle />
      </div>
    </>
  );
};

export default Profile;