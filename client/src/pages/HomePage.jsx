import React from "react";
import "../styles/Homepage.css";
import Jobs from "../components/Homeparts/Jobs"
import Footer from "../components/Homeparts/Footer";
const HomePage = () => {
  return (
    <>
      
      <div className="poster">
      </div>
      <div id="moving-div" className="">
        <div className="companies">
          COMPANIES THAT POST THEIR REQUIREMENTS
        </div>
        <div id="blur-left"></div>
        <div className="move">
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc902b1be20_home_icon_amazon.png?d=292x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc92ec17499_home_icon_walmart.png?d=288x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc902b1be20_home_icon_amazon.png?d=292x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc8e3873ff1_home_icon_wipro2.png?d=222x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc902b1be20_home_icon_amazon.png?d=292x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc92ec17499_home_icon_walmart.png?d=288x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc910a7ffe4_home_icon_flipkart.png?d=395x278" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc8e3873ff1_home_icon_wipro2.png?d=222x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc910a7ffe4_home_icon_flipkart.png?d=395x278" alt="" />

        </div>
        <div className="move">
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc91f112f5f_home_icon_loreal.png?d=375x210" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc92ec17499_home_icon_walmart.png?d=288x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc910a7ffe4_home_icon_flipkart.png?d=395x278" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc902b1be20_home_icon_amazon.png?d=292x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc8e3873ff1_home_icon_wipro2.png?d=222x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc910a7ffe4_home_icon_flipkart.png?d=395x278" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc8e3873ff1_home_icon_wipro2.png?d=222x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc92ec17499_home_icon_walmart.png?d=288x190" alt="" />
          <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/65cc8e3873ff1_home_icon_wipro2.png?d=222x190" alt="" />

        </div>
        <div id="blur-right"></div>

      </div>
      <div className="jobsection">
   
        
            <Jobs/>
          
      
      </div>
      <div>
      <Footer/>
      </div>
    </>
  );
};

export default HomePage;
