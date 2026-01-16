import {
    Box, 
    Grid,
    Button,
    TextField,
    Paper,
    Typography
} from '@mui/material'
import axios from 'axios';
import { useContext } from 'react';
import { CallLogContext } from '../../ContextPage/Context';
import dayjs from 'dayjs';


const Adherence = () =>
{
    const StyleFields = {minWidth:'60px', width:'5%', mr:2
    };
    const styleLables = {display:'inline', position:'relative', top:'15px',
        fontSize:{
            md:'0.8rem',
            lg:'1rem'
        }
    };

    const {formData, 
        regulatoryTableData,
        marketConductTableData,
        productRiskTableData, 
        processTableData, 
        customerExperienceTableData,
        remediationTableData,

        regulatorySummary,
        marketSummary,
        productSummary,
        processSummary,
        customerSummary,
        // remediationSummary

         }= useContext(CallLogContext);
     const createdOn = dayjs().format('YYYY/MM/DD, HH:mm:ss');




    const handleSubmitAll = async () => {
        try {
            // ✅ Filter findings where compliance is "No"
            const FindingRegulatory = regulatoryTableData.filter(row => row.compliance === "No");
            const FindingMarket = marketConductTableData.filter(row => row.compliance === "No");
            const FindingProduct = productRiskTableData.filter(row => row.compliance === "No");
            const FindingProcess = processTableData.filter(row => row.compliance === "No");
            const FindingCustomer = customerExperienceTableData.filter(row => row.compliance === "No");
            // const FindingRegulatory = regulatoryTableData.filter(row => row.compliance === "No").map(row => ({...row,status: "Not Started", Assigned:formData.AgentName}));
            // const FindingMarket = marketConductTableData.filter(row => row.compliance === "No").map(row => ({...row,status: "Not Started", Assigned:formData.AgentName}));
            // const FindingProduct = productRiskTableData.filter(row => row.compliance === "No").map(row => ({...row,status: "Not Started", Assigned:formData.AgentName}));
            // const FindingProcess = processTableData.filter(row => row.compliance === "No").map(row => ({...row,status: "Not Started", Assigned:formData.AgentName}));
            // const FindingCustomer = customerExperienceTableData.filter(row => row.compliance === "No").map(row => ({...row,status: "Not Started", Assigned:formData.AgentName}));

            // ✅ Construct full context data for /submit-form
            const formSubmissionData = {
            ...formData,
            regulatoryTableData,
            marketConductTableData,
            productRiskTableData,
            processTableData,
            customerExperienceTableData,
            remediationTableData
            };

            // ✅ Construct filtered findings data for /api/dispute
            const disputeData = {
            createdOn,

            contactId : formData.contactId,
            policyNumber : formData.policyNumber,
            callSystem: formData.callSystem,
            callType: formData.selectedType?.type,
            Selectedcategory: formData.Selectedcategory?.name,
            selectedSubCategory: formData.selectedSubCategory,
            dateTime :dayjs( formData.dateTime).format('YYYY/MM/DD, HH:mm:ss'),
            dateTimeEnd:dayjs( formData.dateTimeEnd).format('YYYY/MM/DD, HH:mm:ss'),
            secondCall: formData.secondCall?.value,
            additionalCall: formData.additionalCall,
            AgentName: formData.AgentName,
            riskOfficer: formData.riskOfficer,
            teamLeader: formData.teamLeader,
            callDuration: formData.callDuration,
            Status: "Not Started",
            Assigned:formData.AgentName,
            actionItem: formData.actionItem,
            dateAndTimeOfRemediation: formData.dateAndTimeOfRemediation,
            dateAndTimeOfDueDate: dayjs( formData.dateAndTimeOfDueDate).format('YYYY/MM/DD, HH:mm:ss'),



            FindingRegulatory,
            FindingMarket,
            FindingProduct,
            FindingProcess,
            FindingCustomer
            };

            // ✅ Submit to /submit-form
            //const formResponse = await axios.post('https://riskapp-backend.onrender.com/submit-form', formSubmissionData);
            const formResponse = await axios.post('https://riskapp-backend.onrender.com/submit-form', formSubmissionData);
            console.log('✅ Form submission successful:', formResponse.data);

            if(FindingRegulatory.length != 0 ||
            FindingMarket.length != 0 ||
            FindingProduct.length != 0 ||
            FindingProcess.length != 0 ||
            FindingCustomer.length != 0 )
            {
                            // ✅ Submit to /api/dispute
            const disputeResponse = await axios.post('https://riskapp-backend.onrender.com/api/dispute', disputeData);
            console.log('✅ Dispute submission successful:', disputeResponse.data);

            alert('✅submission is successful!');
            }else
            {
                alert('❌submission is successful!');
            }

            // navigate('/Qa-Product-risk'); // Optional navigation
        } catch (error) {
            console.error('❌ Submission failed:', error.response?.data || error.message);
            alert('Submission failed:\n' + (error.response?.data?.details?.join('\n') || error.message));
        }
        };


    return(
        <Box sx={{flex:'1',mt:2,ml:4, height:"78vh"}}>
            <Paper elevation={1} sx={{p:2, backgroundColor:'rgb(255, 255, 255)', width:'95%'}}>
            <Grid container spacing={2} m={1}>
                
                <Grid item size={{md:6}} >
                    <Box sx={{mb:2, mt:2}}>
                    <TextField value={formData.selectedType?.type || " "}
                     label="Call Type"
                     inputProps={{readonly:true}} 
                     InputLabelProps={{shrink:true}}
                     fullWidth />
                    </Box>
                    <Box sx={{mb:2, mt:2}}>
                    <TextField
                    value={formData.Selectedcategory?.name || " "}
                    inputProps={{readonly:true}}
                    InputLabelProps={{shrink:true}}
                    label="Product Type" fullWidth/>
                    </Box>
                    <Box sx={{mb:2, mt:2}}>
                    <TextField 
                    value={formData.selectedSubCategory || " "}
                    inputProps={{readonly:true}}
                    InputLabelProps={{shrink:true}}
                    label="Product Cat Type" fullWidth/>
                    </Box>
                    <Box sx={{mb:2, mt:2}}>
                    <TextField 
                    value={formData.policyNumber || " "}
                    inputProps={{readonly:true}}
                    InputLabelProps={{shrink:true}}
                    label="Policy Number" fullWidth/>
                    </Box>

                </Grid>
                <Grid item size={{md:6}}>
                    <Box sx={{mb:2, mt:2}}>
                    <TextField
                    value={formData.AgentName || " "}
                    inputProps={{readonly:true}}
                    InputLabelProps={{shrink:true}}
                    label="Agent Name" fullWidth/>
                    </Box>
                    <Box sx={{mb:2, mt:2}}>
                    <TextField 
                    value={formData.teamLeader || " "}
                    inputProps={{readonly:true}}
                    InputLabelProps={{shrink:true}}
                    label="Team Leader Name" fullWidth/>
                    </Box>
                    <Box sx={{mb:2, mt:2}}>
                    <TextField 
                    value={formData.riskOfficer || " "}
                    inputProps={{readonly:true}}
                    InputLabelProps={{shrink:true}}
                    label="Risk Officer Name" fullWidth/>
                    </Box>

                </Grid>
               

            </Grid>
             </Paper>

             <Paper elevation={1} sx={{p:2,mt:2, backgroundColor:'rgb(255, 255, 255)', width:'95%'}}>
                <Grid container>
                    <Grid item size={{ xs:12, md:12, lg:6 }} sx={{textWrap:'nowrap'}}>
                        <Box mb={2} >
                        <Typography sx={{...styleLables, mr:5.5}}><strong>Compliance</strong></Typography>
                        <TextField value={regulatorySummary['Yes'] + marketSummary['Yes'] || 0} InputLabelProps={{shrink:true}} label="YES" sx={StyleFields}/>
                        <TextField value={regulatorySummary['No'] + marketSummary['No'] || 0} InputLabelProps={{shrink:true}} label="NO"  sx={StyleFields}/>
                        <TextField value={ regulatorySummary['N/A'] + marketSummary['N/A'] ||0} InputLabelProps={{shrink:true}} label='N/A' sx={StyleFields}/>
                        <Typography sx={{...styleLables, mr:2}}><strong>Error Rate</strong></Typography>
                        <TextField label='N/A' value={(regulatorySummary['No'] + marketSummary['No'])+ "%" || 0} InputLabelProps={{shrink:true}} sx={StyleFields}/>
                        </Box>
                        <Box mb={2}>
                        <Typography sx={{...styleLables, mr:6.5}}><strong>Regulatory</strong></Typography>
                        <TextField value={regulatorySummary['Yes'] || 0} InputLabelProps={{shrink:true}} label="YES" sx={StyleFields}/>
                        <TextField value={regulatorySummary['No'] || 0} InputLabelProps={{shrink:true}}  label="NO"  sx={StyleFields}/>
                        <TextField value={regulatorySummary['N/A'] || 0} InputLabelProps={{shrink:true}}  label='N/A' sx={StyleFields}/>
                        <Typography sx={{...styleLables, mr:2}}><strong>Error Rate</strong></Typography>
                        <TextField label='N/A' value={regulatorySummary['No']+ "%" || 0} InputLabelProps={{shrink:true}}  sx={StyleFields}/>
                        </Box>
                        <Box>
                        <Typography  sx={{...styleLables, mr:2}}><strong>Market Conduct</strong></Typography>
                        <TextField value={marketSummary['Yes'] || 0} InputLabelProps={{shrink:true}} label="YES" sx={StyleFields}/>
                        <TextField value={marketSummary['No'] || 0} InputLabelProps={{shrink:true}} label="NO"  sx={StyleFields}/>
                        <TextField value={marketSummary['N/A'] || 0} InputLabelProps={{shrink:true}} label='N/A' sx={StyleFields}/>
                        <Typography sx={{...styleLables, mr:2}}><strong>Error Rate</strong></Typography>
                        <TextField label='N/A' value={marketSummary['No']+"%" || 0} InputLabelProps={{shrink:true}} sx={StyleFields}/>
                        </Box>
                    </Grid>

                    <Grid item mt={{xs:2,sm:2,md:2,xl:0}} size={{md:12, lg:12,xl:6}} sx={{textWrap:'nowrap'}}>
                        <Box mb={2}>
                        <Typography sx={{...styleLables, mr:6}}><strong>Operational Risk</strong></Typography>
                        <TextField value={ processSummary['Yes'] + productSummary['Yes']|| 0} InputLabelProps={{shrink:true}} label="YES" sx={StyleFields}/>
                        <TextField value={processSummary['No'] + productSummary['No']|| 0} InputLabelProps={{shrink:true}} label="NO"  sx={StyleFields}/>
                        <TextField value={ processSummary['N/A'] + productSummary['N/A']|| 0} InputLabelProps={{shrink:true}} label='N/A' sx={StyleFields}/>
                        <Typography sx={{...styleLables, mr:2}}><strong>Error Rate</strong></Typography>
                        <TextField label='N/A' value={(customerSummary['No'] + processSummary['No'] + productSummary['No'])+ "%"|| 0} InputLabelProps={{shrink:true}} sx={StyleFields}/>
                        </Box>
                        <Box mb={2}>
                        <Typography sx={{...styleLables, mr:14}}><strong>Product</strong></Typography>
                        <TextField value={productSummary['Yes'] || 0} InputLabelProps={{shrink:true}} label="YES" sx={StyleFields}/>
                        <TextField value={productSummary['No']  || 0} InputLabelProps={{shrink:true}} label="NO"  sx={StyleFields}/>
                        <TextField value={productSummary['N/A'] || 0} InputLabelProps={{shrink:true}} label='N/A' sx={StyleFields}/>
                        <Typography sx={{...styleLables, mr:2}}><strong>Error Rate</strong></Typography>
                        <TextField label='N/A' value={productSummary['No'] + "%" || 0} InputLabelProps={{shrink:true}} sx={StyleFields}/>
                        </Box>
                        <Box mb={2}>
                        <Typography sx={{...styleLables, mr:14}}><strong>Process</strong></Typography>
                        <TextField value={processSummary['Yes'] || 0} InputLabelProps={{shrink:true}} label="YES" sx={StyleFields}/>
                        <TextField value={processSummary['No']  || 0} InputLabelProps={{shrink:true}} label="NO"  sx={StyleFields}/>
                        <TextField value={processSummary['N/A'] || 0} InputLabelProps={{shrink:true}} label='N/A' sx={StyleFields}/>
                        <Typography sx={{...styleLables, mr:2}}><strong>Error Rate</strong></Typography>
                        <TextField label='N/A' value={processSummary['No']+"%"  || 0} InputLabelProps={{shrink:true}} sx={StyleFields}/>
                        </Box>
                        <Box mb={2}>
                        <Typography sx={{...styleLables, mr:2}}><strong>Customer Experience</strong></Typography>
                        <TextField value={customerSummary['Yes'] || 0} InputLabelProps={{shrink:true}} label="YES" sx={StyleFields}/>
                        <TextField value={customerSummary['No']  || 0} InputLabelProps={{shrink:true}} label="NO"  sx={StyleFields}/>
                        <TextField value={customerSummary['N/A'] || 0} InputLabelProps={{shrink:true}} label='N/A' sx={StyleFields}/>
                        <Typography sx={{...styleLables, mr:2}}><strong>Error Rate</strong></Typography>
                        {/* <TextField label='N/A' value={customerSummary['No'] + "%"  || 0} InputLabelProps={{shrink:true}} sx={StyleFields}/> */}
                        </Box>
                        {/* <Box >
                        <Typography sx={{display:'inline', position:'relative', top:'15px', mr:10}}><strong>Remediation</strong></Typography>
                        <TextField value={remediationSummary['Yes'] || 0} InputLabelProps={{shrink:true}} label="YES" sx={{minWidth:'60px', width:'5%', mr:2}}/>
                        <TextField value={remediationSummary['No'] || 0} InputLabelProps={{shrink:true}} label="NO"  sx={{minWidth:'60px', width:'5%', mr:2}}/>
                        <TextField value={remediationSummary['N/A'] || 0} InputLabelProps={{shrink:true}} label='N/A' sx={{minWidth:'60px', width:'5%', mr:2}}/>
                        <Typography sx={{display:'inline', position:'relative', top:'15px', mr:2}}><strong>Error Rate</strong></Typography>
                        <TextField label='N/A' sx={{minWidth:'60px', width:'5%', mr:2}}/>
                        </Box> */}

                    </Grid>
                </Grid>
    
             </Paper>

             <Button 
                     variant='contained' 
                     onClick={handleSubmitAll}
                     sx={{width:'15%', bgcolor:"white", color:"black", mt:3}}>Submit</Button>
        </Box>
    );
}

export default Adherence;