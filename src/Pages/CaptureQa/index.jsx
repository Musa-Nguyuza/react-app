import React from "react"
import { Helmet } from "react-helmet-async"
import FormQa from "./Form/FormQa"


const CaptureEvaluation = () => {

    return (
      <>

        <Helmet>
          <title>CaptureQA</title>
        </Helmet>
          <FormQa/>
      </>
    )
  }
  
export default CaptureEvaluation;