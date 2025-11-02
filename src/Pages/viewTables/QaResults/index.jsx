import React from "react"
import { Helmet } from "react-helmet"
import ViewQa from "./ViewPoliciesTable/ViewQa"


const QaResults = () => {

    return (
      <>

        <Helmet>
          <title>VIEW QA RESILTS</title>
        </Helmet>
            <ViewQa/>
      </>
    )
  }
  
export default QaResults;