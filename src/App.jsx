import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from './Pages/Sidebar/Sidebar.jsx'
import Regulatory from './Pages/CaptureQa/Tables/Regulatory.jsx'
import Marketconduct from './Pages/CaptureQa/Tables/Marketconduct.jsx'
import QaProdRisk from './Pages/CaptureQa/Tables/QaProductrisk.jsx'
import ProcessQa from './Pages/CaptureQa/Tables/ProcessQa.jsx'
import QaCustomerExp from './Pages/CaptureQa/Tables/QaCustomerExp.jsx'
import Remediation from './Pages/CaptureQa/Tables/Remediation.jsx'
import Adherence from './Pages/CaptureQa/Tables/Adherence.jsx'
import EditPage from './Pages/EditingPages/EditPage.jsx'
import CommercialCBI from './Pages/CommercialCbi/CommercialCBI.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import ViewHomePage from './Pages/homePage'
import ViewRegulatory from './Pages/viewTables/QaResults/Tables/ViewRegulatory.jsx'
import ViewMarketConduct from './Pages/viewTables/QaResults/Tables/ViewMarketConduct.jsx'
import ViewProductRisk from './Pages/viewTables/QaResults/Tables/ViewProductRisk.jsx'
import ViewProcessQa from './Pages/viewTables/QaResults/Tables/ViewProcessQa.jsx'
import ViewCustomerExp from './Pages/viewTables/QaResults/Tables/ViewCustomerExp.jsx'
import ViewPhrase from './Pages/viewTables/QaResults/Tables/ViewPhrase/ViewPhrase.jsx'
import ViewOptions from './Pages/viewTables/ViewOptions.jsx'
import FindingDetails from './Pages/viewTables/Findings/PoliciesTable/PolicyFinding/FindingDetails.jsx'
import ViewFindingTable from './Pages/viewTables/Findings/PoliciesTable/PolicyFinding/ViewFindingTable.jsx'
import CaptureEvaluation from './Pages/CaptureQa/index.jsx'
import Finding from './Pages/viewTables/Findings/index.jsx'
import QaResults from './Pages/viewTables/QaResults/index.jsx'
import Login from './Pages/homePage/login/login.jsx'
import SecureRoute from './Pages/privateRoute/SecureRoute.jsx'
import Register from './Pages/homePage/register/register.jsx'
// import ExcelToJsonConverter from './exceltojson.jsx'
import RemediationDetails from './Pages/viewTables/Findings/PoliciesTable/PolicyFinding/RemediationDetails.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/> } />
        {/* <Route path="/json" element={<ExcelToJsonConverter/> } /> */}
        <Route path="/Register" element={<Register/> } />
        <Route path="/homepage" element={<SecureRoute> <ViewHomePage/> </SecureRoute> } />

        <Route path="/capture-form" element={
          <SecureRoute>
          <Sidebar captureHeading="PLEASE COMPLETE CALL DETAILS BELOW">
            <CaptureEvaluation />
          </Sidebar>
          </SecureRoute>
          } />
        <Route path="/capture-form/Regulatory" element={
          <SecureRoute>
          <Sidebar captureHeading="Please Complete Compliance QA - Regulatory">
            <Regulatory/>
          </Sidebar>
          </SecureRoute>
          } />


        <Route path='/Remediation/:id' element={ <SecureRoute>
          <SecureRoute> <Sidebar captureHeading="REMEDIATION">
            <Remediation/>
           </Sidebar> </SecureRoute>
        </SecureRoute>}
        />
/

        <Route path='/MarketConduct' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Compliance QA - Market Conduct">
          <Marketconduct/>
          </Sidebar></SecureRoute>}
          />

        <Route path='/Qa-Product-risk' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Product Risk QA Below">
            <QaProdRisk/>
          </Sidebar> 
        </SecureRoute>}
        />

        <Route path='/Process-Qa' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Process QA Below">
            <ProcessQa/>
          </Sidebar> 
        </SecureRoute>}
        />


        <Route path='/Customer-Experience-Qa' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Customer Experience QA Below">
            <QaCustomerExp/>
          </Sidebar> 
        </SecureRoute>}
        />


        <Route path='/Remediation' element={ <SecureRoute>
          <Sidebar captureHeading="REMEDIATION">
            <Remediation/>
          </Sidebar> 
        </SecureRoute>}
        />

        <Route path='/adherence' element={ <SecureRoute>
          <Sidebar captureHeading="Control Adherence">
            <Adherence/>
          </Sidebar>
          
        </SecureRoute>}/>


        {/* ✅✅Edititng route */}
          <Route path="/capture-form/Regulatory/:id" element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Compliance QA - Regulatory">
            <Regulatory/>
          </Sidebar>
          </SecureRoute>} />

          <Route path='/MarketConduct/:id' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Compliance QA - Market Conduct">
          <Marketconduct/>
          </Sidebar></SecureRoute>}
          />

          <Route path='/Qa-Product-risk/:id' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Product Risk QA Below">
            <QaProdRisk/>
          </Sidebar> 
        </SecureRoute>}
        />

        <Route path='/Process-Qa/:id' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Process QA Below">
            <ProcessQa/>
          </Sidebar> 
        </SecureRoute>}
        />
        <Route path='/Customer-Experience-Qa/:id' element={ <SecureRoute>
          <Sidebar captureHeading="Please Complete Customer Experience QA Below">
            <QaCustomerExp/>
          </Sidebar> 
        </SecureRoute>}
        />

        

        {/*🪟 VIEW ROUTES  */}
        <Route exact path='/view-data' element={<SecureRoute>
          <Sidebar captureHeading="View Policy Quality Assurance Results">
          <QaResults/>
          </Sidebar>
        </SecureRoute>} />

        <Route path='/view-regulatory/:id' element={<SecureRoute>
        <Sidebar captureHeading="View Policy Quality Assurance Results - Regulatory">
          <ViewRegulatory/>
        </Sidebar>
      </SecureRoute>} />

      <Route path='/view-market_conduct/:id' element={<SecureRoute>
        <Sidebar captureHeading="View Policy Quality Assurance Results - Market Conduct">
          <ViewMarketConduct/>
        </Sidebar>
      </SecureRoute>} />

      <Route path='/view-productrisk/:id' element={<SecureRoute>
        <Sidebar captureHeading="View Policy Quality Assurance Results - Product Risk">
          <ViewProductRisk/>
        </Sidebar>
      </SecureRoute>} />

      <Route path='/view-processqa/:id' element={<SecureRoute>
        <Sidebar captureHeading="View Policy Quality Assurance Results - Process QA">
          <ViewProcessQa/>
        </Sidebar>
      </SecureRoute>} />


    <Route path='/view-customerexp/:id' element={ <SecureRoute>
        <Sidebar captureHeading="View Policy Quality Assurance Results - Customer Experience">
          <ViewCustomerExp/>
        </Sidebar>
      </SecureRoute>} />

    <Route path='/view-phrase/:id/:index/:tableName' element={ <SecureRoute>
        <Sidebar captureHeading="View Policy Quality Assurance Results">
          <ViewPhrase/>
        </Sidebar>
      </SecureRoute>} />

      <Route path='/view-options' element={ <SecureRoute>
        <Sidebar captureHeading="Select Option">
          <ViewOptions/>
        </Sidebar>

      </SecureRoute>} />

      <Route path='/view-findings' element={ <SecureRoute>
        <Sidebar captureHeading="View Policy Remediation">
          <Finding/>
        </Sidebar>

      </SecureRoute>} />

      {/* <Route path='/edit-finding/:id/:type/:index' element={ <SecureRoute>
        <Sidebar captureHeading="Edit Remediation Details">
          <FindingDetails/>
        </Sidebar>

      </SecureRoute>} /> */}
      <Route path='/edit-finding/:id' element={ <SecureRoute>
        <Sidebar captureHeading="Edit Remediation Details">
          <RemediationDetails/>
        </Sidebar>

      </SecureRoute>} />
      <Route path='/view/finding/details/:id' element={ <SecureRoute>
        <Sidebar captureHeading="View Remediation Details">
          <ViewFindingTable/>
        </Sidebar>

      </SecureRoute>} />

      {/*🪟 END OF VIEW ROUTES  */}
      <Route path='/edit/:id' element={ <SecureRoute>
        <Sidebar captureHeading="Edit Policy Quality Assurance Results">
          <EditPage/>
        </Sidebar>
        </SecureRoute>
      } />

      <Route path='/commercial-cbi' element={
        <Sidebar captureHeading="Commercial CBI">
          <CommercialCBI/>
        </Sidebar>
      } />

      <Route path='/dashboard' element={
        <Sidebar captureHeading="Dashboard">
          <Dashboard/>
        </Sidebar>
      } />

      </Routes>
    </Router>


  )
}

export default App
