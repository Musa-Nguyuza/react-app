import React from "react"
import { Helmet } from "react-helmet"
import Homepage from "./home/Homepage"


const ViewHomePage = () => {

    return (
      <>

        <Helmet>
          <title>HOME PAGE</title>
        </Helmet>
            <Homepage/>
      </>
    )
  }
  
export default ViewHomePage;