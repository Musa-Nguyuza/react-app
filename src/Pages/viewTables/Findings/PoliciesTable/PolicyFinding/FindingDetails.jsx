import React, { useState, useEffect } from "react";
import { Paper, Grid, Box, Button, Typography, TextField,
    FormControl, RadioGroup, FormControlLabel, Radio,
    InputLabel, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { useParams } from "react-router";
import axios from "axios";

const consequencesOptions =["Yes", "No"]
const findingTypeoptions = ["Moderate", "Severe"]
const statusOptions = ["Not Started","In Progress","Completed"]
const AsignOptions =["Pontsho, Kgoete","Kulani, Baloyi","Ntsako, Maluleka","Tshepo, Seotimeng"]


const FindingDetails = () =>
{
    const {id, type, index} = useParams();
    const [finding, setFinding] = useState(null);
    const [fullData, setFullData] = useState(null);

    const [openAssignDialog, setOpenAssignDialog] = useState(false);
    const handleOpenAssign = () => setOpenAssignDialog(true);
    const handleCloseAssign = () => setOpenAssignDialog(false);


  useEffect(() => {
    axios.get('https://riskapp-backend.onrender.com/api/dispute/data').then(res => {
      const findingsList = res.data;
      const selectedFinding = findingsList.find(f => f.id === parseInt(id));

      if (!selectedFinding) {
        console.error('No finding found with ID:', id);
        return;
      }

      const item = selectedFinding[type][parseInt(index)];
      setFinding(item);
      setFullData(selectedFinding);
    });
  }, [id, type, index]);

  const handleChange = (field, value) => {
    setFinding(prev => ({ ...prev, [field]: value }));
  };

    const handleSubmit = () => {
    const updatedData = { ...fullData };
    const cleanedFinding = { ...finding };

    // List of fields to inject into the correct finding table
    const nestedFields = ["Assigned",'findingType', 'remedialAction',"findingRemediated","conquenceManagementRequired",
        "RiskCheckConsequencesManagement", "reviewComment", "discomComment", "status"
    ];

    if (cleanedFinding[type]) {
        cleanedFinding[type] = cleanedFinding[type].map((entry) => {
        const updatedEntry = { ...entry };
        nestedFields.forEach((field) => {
            if (cleanedFinding[field] !== undefined) {
            updatedEntry[field] = cleanedFinding[field];
            }
        });
        return updatedEntry;
        });

        // Remove nested fields from the root level
        nestedFields.forEach((field) => {
        delete cleanedFinding[field];
        });
    }

    updatedData[type][parseInt(index)] = cleanedFinding;

    axios.put(`https://riskapp-backend.onrender.com/api/dispute/data/${updatedData.id}`, updatedData)
        .then(() => {
        window.alert('Updated successfully');
        });
    };


  if (!finding) return <div style={{margin:'10%'}}>Loading...</div>;
  


  
    // const handleDataChange = (field, value) => {
    //     setFullData(prev => ({ ...prev, [field]: value }));
    // };


    return(
        <>
        <Box component="form" sx={{
                maxHeight: '80vh',
                overflowY:'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:"2%",
            }}>
            <Paper elevation={0} sx={{ p: 1, maxWidth: "80vw",
                        backdropFilter: "blur(10px)",
                        borderRadius: 0,
                        marginTop:'auto',
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", 
                        background: "rgb(255, 255, 255)", '& label': {color: 'Black'}, '& fieldset':{borderColor:'black'} }}>
                <Grid container spacing={2}>
                    <Grid item size={{md:12,sm:12}} sx={{backgroundColor:'rgba(44, 16, 206, 1)', p:1.5, color:'white'}}>
                        <Typography >A. Risk Check and Finding Details</Typography>
                    </Grid>

                    <Grid item size={{lg:6, sm:12}}>
                        <TextField label="Question" 
                        multiline
                        rows={4.2}
                        InputLabelProps={{shrink:true}} value={finding.phrase} fullWidth/>
                    </Grid>

                     <Grid item size={{lg:6, sm:12}}>
                        
                        <TextField label="Policy Number" InputLabelProps={{shrink:true}} value={fullData.policyNumber} fullWidth/>
            
                        <TextField label="POE" 
                        InputLabelProps={{shrink:true}} 
                        value={finding.comment} sx={{mt:2}}fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Created On" InputLabelProps={{shrink:true}} value={fullData.createdOn}fullWidth/>
                    </Grid>
                   
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Call Type" InputLabelProps={{shrink:true}} value={fullData.callType} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Call System" InputLabelProps={{shrink:true}} value={fullData.callSystem} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Category" InputLabelProps={{shrink:true}} value={fullData.Selectedcategory} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Sub Category" InputLabelProps={{shrink:true}} value={fullData.selectedSubCategory} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Agent Name" InputLabelProps={{shrink:true}} value={fullData.AgentName} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Risk Officer" InputLabelProps={{shrink:true}} value={fullData.riskOfficer} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Team Leader" InputLabelProps={{shrink:true}} value={fullData.teamLeader} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Call Duration" InputLabelProps={{shrink:true}} value={fullData.callDuration} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Date & Time of call" InputLabelProps={{shrink:true}} value={fullData.dateTime} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Date & Time of call End" InputLabelProps={{shrink:true}} value={fullData.dateTimeEnd} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Was there a second call?" InputLabelProps={{shrink:true}} value={fullData.secondCall} fullWidth/>
                    </Grid>
                    <Grid item size={{lg:4,sm:6}}>
                        <TextField label="Additional Call IDs" InputLabelProps={{shrink:true}} value={fullData.additionalCall} fullWidth/>
                    </Grid>

                    <Grid item size={{lg:4,sm:6}}>
                        <Autocomplete
                            options={findingTypeoptions}
                            value={findingTypeoptions.includes(finding.findingType) ? finding.findingType : null}
                            onChange={(event, newValue) => handleChange('findingType', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Finding Type" fullWidth/>
                            )}
                        />
                    </Grid>
                    <Grid item size={{lg:4, sm:6}}>
                        <Autocomplete
                            options={statusOptions}
                            value={statusOptions.includes(finding.status) ? finding.status : null}
                            onChange={(event, newValue) => handleChange('status', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Status" fullWidth/>
                            )}
                        />
                    </Grid>
                            
                    <Grid item size={{md:12,sm:12}} sx={{backgroundColor:'rgba(44, 16, 206, 1)', p:1.5, color:'white'}}>
                        <Typography >B. Finding Remediation (Agent)</Typography>
                    </Grid>
                    <Grid item size={{md:12}} display={"flex"}>
                        <Typography sx={{ml:3, mt:1, mr:2}}>I confirm that the finding has been remediated</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup row value={finding.findingRemediated}                        
                                onChange={e => handleChange('findingRemediated', e.target.value)}
                            >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                            <FormControlLabel value="Dispute" control={<Radio />} label="Dispute" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item size={{md:3}} sx={{textAlign:'end'}}>
                        <Typography >Explanation of event and Remedial actions:</Typography>
                    </Grid>
                    <Grid item size={{md:9,sm:12}}>
                        <TextField
                        value={finding.remedialAction}
                        onChange={e => handleChange('remedialAction', e.target.value)}
                        id="outlined-multiline-static"
                        multiline
                        rows={2}
                        fullWidth
                        />
                    </Grid>
                    


                    <Grid item size={{md:12,sm:12}} sx={{backgroundColor:'rgba(44, 16, 206, 1)', p:1.5, color:'white'}}>
                        <Typography >C. Risk Check Consequences Management (Team Leader)</Typography>
                    </Grid>
                    <Grid item size={{md:10}} >
                        <Typography sx={{ml:1,mt:1}}>I confirm that i have taken corrective action in accordance with the disciplinary procedure and risk consequences management framework according to the indicated severity level in consultation with my people and culture business patner and line manager:</Typography>
                    </Grid>
                    <Grid item size={{md:2,sm:12}}>
                        <FormControl component="fieldset">
                            <RadioGroup row value={finding.RiskCheckConsequencesManagement} 
                            onChange={e => handleChange('RiskCheckConsequencesManagement', e.target.value)} >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item size={{md:12,sm:12}} >
                        <Autocomplete
                        options={consequencesOptions}
                        value={consequencesOptions.includes(finding.conquenceManagementRequired) ? finding.conquenceManagementRequired : null}
                        onChange={(event, newValue) => handleChange('conquenceManagementRequired', newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Consequence Management Required?" sx={{width:'50%'}} 
                            InputLabelProps={{shrink:true}}
                            placeholder="Select"/>
                        )}
                        />
                    </Grid>
                    <Grid item size={{md:3}} >
                        <Typography >Letter of Event Attachment (Max 5 files):</Typography>
                    </Grid>
                    <Grid item size={{md:9}}>
                        <InputLabel htmlFor="file-upload">Upload Document</InputLabel>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            style={{ marginTop: '8px' }}
                            accept=".pdf,.doc,.docx"
                        /> 
                    </Grid>


                    <Grid item size={{md:12,sm:12}} sx={{backgroundColor:'rgba(44, 16, 206, 1)', p:1.5, color:'white'}}>
                        <Typography >D. Reviewer Comments (Risk Officer)</Typography>
                    </Grid>
                    <Grid item size={{md:2}} >
                        <Typography >Review Comments:</Typography>
                    </Grid>
                    <Grid item size={{md:10,sm:12}}>
                        <TextField
                        value={finding.reviewComment}
                        onChange={e => handleChange('reviewComment', e.target.value)}
                        id="outlined-multiline-static"
                        multiline
                        rows={2}
                        fullWidth
                        />
                    </Grid>
                    <Grid item size={{md:2}}>
                        <Typography >Discom Comments:</Typography>
                    </Grid>
                    <Grid item size={{md:10,sm:12}}>
                        <TextField
                        value={finding.discomComment}
                        onChange={e => handleChange('discomComment', e.target.value)}
                        id="outlined-multiline-static"
                        multiline
                        rows={2}
                        fullWidth
                        />
                    </Grid>

                    <Grid item size={{md:12,sm:12}}>
                        <Box display="flex" justifyContent={"space-between"}>
                        <Button
                            variant='contained'
                            sx={{ width: '20%', mr: 2, bgcolor: "rgba(35, 35, 48, 0.34)", color: "white" }}
                            onClick={handleOpenAssign}
                            >
                            Assign
                        </Button>

                        <Button 
                        onClick={handleSubmit}
                         variant='contained' 
                         sx={{width:'20%', bgcolor:"white", color:"black"}}
                         
                         >Save</Button> 
                         </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>


        <Dialog open={openAssignDialog} onClose={handleCloseAssign} fullWidth maxWidth="sm">
            <DialogTitle>Assign</DialogTitle>
            <DialogContent>
                <Autocomplete
                    sx={{mt:1}}
                    options={AsignOptions}
                    value={finding.Assigned}
                    onChange={(event, newValue) => handleChange('Assigned', newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Assign" fullWidth/>
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAssign}>Ok</Button>
            </DialogActions>
        </Dialog>



    </>
        
    );
}
export default FindingDetails;

