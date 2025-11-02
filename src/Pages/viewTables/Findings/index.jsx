import React from "react"
import { Helmet } from "react-helmet"
import ViewFindings from "./PoliciesTable/ViewFindings"


const Finding = () => {

    return (
      <>

        <Helmet>
          <title>FINDINGS</title>
        </Helmet>
            <ViewFindings/>
      </>
    )
  }
  
export default Finding;