import React from "react";
import "../style/circle.css";

// component of home page 
const Circle = (props) => {
 // console.log(props.count?.totalJournals);
  return (
    <section className="container circles">
      <div className="circle">

        <span className="circle-name">
          <p style={{textAlign:"center", fontSize:"30px"}}> {props.count?.totalJournals}</p>
           <br/>
          Submitted
          <br />
          Journals
        </span>
      </div>
      <div className="circle">
        
        <span className="circle-name">
        <p style={{textAlign:"center" ,fontSize:"30px"}}>  {props.count?.pendingJournals}</p>
       
        <br/>
          Pending
          <br />
          Journals
        </span>
      </div>
      <div className="circle">
        
        <span className="circle-name">
        <p style={{textAlign:"center",fontSize:"30px"}}>   {props.count?.completedJournals}</p>
       
        <br/>
          Publish
          <br />
          Journals
        </span>
      </div>
    </section>
  );
};

export default Circle;
