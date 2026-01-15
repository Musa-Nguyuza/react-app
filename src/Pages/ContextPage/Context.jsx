import React, { createContext, useState } from 'react';


export const CallLogContext = createContext();

export const CallLogProvider = ({ children }) => {
  const initialData ={
    callSystem: "",
    dateTime: null,
    dateTimeEnd: null,
    selectedType: null,
    Selectedcategory: '',
    selectedSubCategory: null,
    secondCall: null,
    additionalCall: null,
    policyNumber: null,
    AgentName: null,
    riskOfficer: null,
    teamLeader: null,
    callDuration: '',
    contactID: null,
    actionItem: '',
    dateAndTimeOfRemediation : null,
    dateAndTimeOfDueDate: null,
  };

  const [formData, setFormData] = useState(initialData)

  const [formErrors, setFormErrors] = useState({
    callSystem: false,
    dateTime: false,
    dateTimeEnd: false,
    selectedType: false,
    Selectedcategory: false,
    selectedSubCategory: false,
    secondCall: null,
    additionalCall: null,
    policyNumber: null,
    AgentName: null,
    riskOfficer: null,
    teamLeader: null,
    callDuration: false,
    contactID: null,
  });

  
const [regulatoryTableData, setRegulatoryTableData] = useState([]);
const [regulatorySummary, setRegulatorySummary] = useState({Yes:0, No:0,'N/A':0});

const [marketConductTableData, setMarketConductTableData] = useState([]);
const [marketSummary, setMarketSummary] = useState({Yes:0, No:0,'N/A':0});

const [productRiskTableData, setProductRiskTableData] = useState([]);
const [productSummary, setProductSummary] = useState({Yes:0, No:0,'N/A':0});

const [processTableData, setProcessTableData] = useState([]);
const [processSummary, setProcessSummary] = useState({Yes:0, No:0,'N/A':0});

const [customerExperienceTableData, setCustomerExperienceTableData] = useState([]);
const [customerSummary, setCustomerSummary] = useState({Yes:0, No:0,'N/A':0});

const [remediationTableData, setRemediationRiskTableData] = useState([]);
const [remediationSummary, setRemediationSummary] = useState({Yes:0, No:0});

const [holdFilter, setHoldFilter] = useState('');
const handleReset = () =>
{
  setFormData(initialData);
}


  return (
    <CallLogContext.Provider value={{ 
        formData,setFormData,
        formErrors,setFormErrors,
        regulatoryTableData,setRegulatoryTableData,
        marketConductTableData,setMarketConductTableData,
        setProductRiskTableData, productRiskTableData,
        processTableData, setProcessTableData,
        customerExperienceTableData, setCustomerExperienceTableData,
        remediationTableData, setRemediationRiskTableData,
        regulatorySummary, setRegulatorySummary,
        marketSummary, setMarketSummary,
        productSummary, setProductSummary,
        processSummary, setProcessSummary,
        customerSummary, setCustomerSummary,
        remediationSummary, setRemediationSummary,
        holdFilter, setHoldFilter,
        handleReset

 }}>
      {children}
    </CallLogContext.Provider>
  );
};



  