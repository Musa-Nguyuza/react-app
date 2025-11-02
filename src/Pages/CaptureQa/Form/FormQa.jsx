import { useContext} from 'react';
import { Box, Grid, TextField, Paper, Typography, Button, Autocomplete } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Link, useNavigate} from 'react-router-dom'
import ProductData from '../../../DATA/ProductTypes.json'
import dayjs from 'dayjs';
import { CallLogContext } from '../../ContextPage/Context';

const prodTypes = ProductData.productTypes;

const callSystemOptions =[ 
    {label:"AWS Connect", value:"AWS Connect"},
    {label:"Nice Call", value:"Nice Call"},
    {label:"Connex One", value:"Connex One"},
    {label:"Process Audit", value:"Process Audit"}
]
const secondCallOption =[ 
    {label:"YES", value:"YES"},
    {label:"NO", value:"NO"}
]


export default function FormQa() {

    const {formData, setFormData, formErrors, setFormErrors} = useContext(CallLogContext);
    const navigate = useNavigate();
    const formGrid = {md:6,sm:6,xs:12 };

    const handleNext = async (e) => {
        e.preventDefault();

        const isCallSystemValid = formData.callSystem !== '';
        const isDateTimeValid = formData.dateTime && dayjs(formData.dateTime).isValid();
        const isCallDurationValid = !isNaN(Number(formData.callDuration)) && Number(formData.callDuration) > 0;

        setFormErrors((prev) => ({
            ...prev,
            callSystem: !isCallSystemValid,
            dateTime: !isDateTimeValid,
            callDuration: !isCallDurationValid
        }));

        if (isCallSystemValid && isDateTimeValid && isCallDurationValid) {
            const filters = {
            filter: formData.Selectedcategory?.name || '',
            subGrouping: formData.selectedSubCategory || '',
            };

            localStorage.setItem('tableFilters', JSON.stringify(filters));
             navigate('/capture-form/Regulatory');


        }
        };



const handleTypeChange = (event, newValue) => {
  setFormData((prev) => ({
    ...prev,
    selectedType: newValue,
    Selectedcategory: null,
    selectedSubCategory: null,
  }));
};

    const handleCategoryChange = (event, newValue) => {
    setFormData((prev) => ({
        ...prev,
        Selectedcategory: newValue,
        selectedSubCategory: null,
    }));
    };

    const handleSubCatChange = (event, newValue) => {
    setFormData((prev) => ({
        ...prev,
        selectedSubCategory: newValue,
    }));
    };

    
    const handleSecondcall = (event, newValue) => {
    setFormData((prev) => ({
        ...prev,
        secondCall: newValue ? newValue.value : "",
    }));
    };


    const categories = formData.selectedType?.categories ?? [];
    const subCategories = formData.Selectedcategory?.subCategories ?? [];




  return (

    <>

            <Box component="form"
            sx={{
                maxHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4,
                marginTop:"5%"
            }}
            >
                
            <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: "80vw",
                        backdropFilter: "blur(10px)",
                        borderRadius: 0,
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", 
                        background: "rgb(255, 255, 255)", '& label': {color: 'Black'}, '& fieldset':{borderColor:'black'} }}>
                
                
                <Grid container spacing={2}>
                   
                    <Grid item size={formGrid} >

                        <Autocomplete

                        options={callSystemOptions}
                        value={
                        callSystemOptions.find(
                            (option) => option.value === formData.callSystem
                        ) || null
                        }
                        onChange={(event, newValue) => {
                        setFormData((prev)=> ({...prev, callSystem: newValue ? newValue.value : "" }));

                        if(newValue)
                        {setFormErrors((prev) => ({...prev, callSystem: false})) }

                        }}
                        error={formErrors.callSystem}
                        
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField  
                            {...params}
                            required
                            helperText ={formErrors.callSystem ? "Call system is required" : ""}
                            FormHelperTextProps={{
                                sx:{color:'red'}
                            }}
                            label="Call System"
                            variant="outlined" fullWidth/>
                        )}
                    />

                    
                    </Grid>

                    <Grid item size={formGrid} >

                        <Autocomplete

                        options={prodTypes}
                        getOptionLabel={(option) => option.type}
                        value={formData.selectedType}
                        onChange={handleTypeChange}
                        renderInput={(params) =>(
                            <TextField {...params}
                            required 
                            label="Call Type" fullWidth/>
                        )}
                        
                        />
                        
                    </Grid>
            

                    <Grid item size={formGrid} >
                        <Autocomplete
                        options={categories}
                        getOptionLabel={(option)=> option.name}
                        value={formData.Selectedcategory}
                        onChange={handleCategoryChange}
                        disabled={!formData.selectedType}

                        renderInput={(params)=> 
                        <TextField 
                        {...params} label="Product Type" fullWidth/>}
                        />

                    </Grid>

                    <Grid item size={formGrid} >
                        <Autocomplete
                        options={subCategories}
                        value={formData.selectedSubCategory}
                        onChange={handleSubCatChange}
                        disabled={!formData.Selectedcategory}
                        renderInput={(params) => 
                        <TextField 
                        {...params}
                        label="Product Sub Cat Type" fullWidth/>
                        }
                        />
                    </Grid>

                    <Grid item size={formGrid} >
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                             label="Date & Time of Call"
                             value={formData.dateTime}
                             
                             onChange={(newValue) => setFormData((prev)=> ({...prev, dateTime: newValue }))}
                             renderInput={(params) => <TextField
                                {...params}
                                error={formErrors.dateTime}  
                                helperText={formErrors.dateTime ? "Date & Time of call required":""} />}
                         sx={{
                            width:"100%"
                         }}/>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item size={formGrid} >
                        <TextField
                        type='number'
                        value={formData.callDuration}
                        error={formErrors.callDuration}
                        onChange={(e)=> setFormData((prev)=> ({...prev, callDuration: e.target.value}))}
                        helperText={formErrors.callDuration ? "Call Duration is required":""}
                        label="Total Call Duration" fullWidth/>
                    </Grid>
            

                    <Grid item size={formGrid}>
                    <TextField
                        value={formData.policyNumber}
                        error={formErrors.policyNumber}
                        onChange={(e) =>
                        setFormData((prev) => ({ ...prev, policyNumber: e.target.value }))
                        }
                        label="Policy Number"
                        fullWidth
                    />
                    </Grid>


                    <Grid item size={formGrid} >
                        <TextField 
                        value={formData.contactID}
                        onChange={(e)=> setFormData((prev)=> ({...prev, contactID: e.target.value }))}
                        label="Contact ID" fullWidth></TextField>
                    </Grid>

                    <Grid item size={formGrid} >
                        <TextField
                        value={formData.teamLeader}
                        onChange={(e)=>setFormData((prev)=> ({...prev, teamLeader: e.target.value }))}
                         label="Team Leader Name" fullWidth></TextField>
                    </Grid>

                    <Grid item size={formGrid} >
                        <TextField 
                        value={formData.AgentName}
                        onChange={(e) => setFormData((prev)=> ({...prev, AgentName: e.target.value }))}
                        label="Agent Name" fullWidth></TextField>
                    </Grid>

                    <Grid item size={formGrid} >
                        <TextField 
                        value={formData.riskOfficer}
                        onChange={(e) => setFormData((prev)=> ({...prev, riskOfficer: e.target.value }))}
                        label="Risk Officer" fullWidth></TextField>
                    </Grid>


                    

                    <Grid item size={{md:6, sm:6}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        label="Date & Time of Call End"
                        value={formData.dateTimeEnd}
                        onChange={(newValue) =>
                            setFormData((prev) => ({ ...prev, dateTimeEnd: newValue }))
                        }
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            error={formErrors.dateTimeEnd}
                            helperText={formErrors.dateTimeEnd ? "End time is required" : ""}
                            fullWidth
                            />
                        )}
                        sx={{ width: "100%" }}
                        />
                    </LocalizationProvider>
                    </Grid>


                    <Grid item size={formGrid} >
                        <Autocomplete
                        options={secondCallOption}
                        value={formData.secondCall}
                        onChange={handleSecondcall}
                        renderInput={(params) => 
                        <TextField 
                        {...params}
                        label="Was there a second call?" fullWidth/>
                        }
                        />
                        
                    </Grid>

                    {formData.secondCall === "YES" &&
                    
                    <Grid item size={formGrid} >
                        <TextField 
                        value={formData.additionalCall}
                        onChange={(e) =>setFormData((prev)=> ({...prev, additionalCall: e.target.value }))}
                        label="Additional Call IDs" 
                        placeholder='Enter additional call IDs separated by /' fullWidth/>
                    </Grid>}
                    

                    <Grid item size={{md:12,sm:12,xs:12}}>
                        <Box display="flex" justifyContent="space-between">
                        <Button variant='contained'  sx={{width:'20%', bgcolor:"white", color:"black"}}>Reset</Button>
                        <Button 
                        onClick={handleNext}
                         variant='contained' 
                         sx={{width:'20%', bgcolor:"white", color:"black"}}>Next</Button>
                         </Box>
                    </Grid>
                
                
                </Grid>
            </Paper>
            </Box>

        

      </>
  );
}
