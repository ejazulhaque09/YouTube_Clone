import React from "react";
import SideNavbar from "../components/SideNavbar";
import Homepage from "../components/Homepage";


const Home = ({sideNavbar}) => {
    return(
        <div className="home">
            <SideNavbar sideNavbar={sideNavbar}/>
            <Homepage sideNavbar={sideNavbar}/>
        </div>
    )
}
export default Home;