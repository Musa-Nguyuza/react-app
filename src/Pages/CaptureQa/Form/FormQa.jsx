import { useContext } from 'react';
import { Box, Grid, TextField, Paper, Typography, Button, Autocomplete } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link, useNavigate } from 'react-router-dom'
import ProductData from '../../../DATA/ProductTypes.json'
import { CallLogContext } from '../../ContextPage/Context';
import dayjs from 'dayjs';


const prodTypes = ProductData.productTypes;

const callSystemOptions = [
    { label: "AWS Connect", value: "AWS Connect" },
    { label: "Nice Call", value: "Nice Call" },
    { label: "Connex One", value: "Connex One" },
    { label: "Process Audit", value: "Process Audit" }
]
const secondCallOption = [
    { label: "YES", value: "YES" },
    { label: "NO", value: "NO" }
]


export default function FormQa() {

    const { formData, setFormData, formErrors, setFormErrors, handleReset } = useContext(CallLogContext);
    const navigate = useNavigate();
    const formGrid = { md: 6, sm: 6, xs: 12 };

    const start = dayjs(formData.dateTime);
    const end = dayjs(formData.dateTimeEnd);
    const allValid = Object.values(formErrors).every((error) => error === false);

    const checkCallTimePositive = start > end;

    // Difference in minutes
    const diffMinutes = end.diff(start, 'minute');

    const handleNext = async (e) => {
        e.preventDefault();

        const isCallSystemValid = formData.callSystem === '';
        const isCallDurationValid = (!isNaN(Number(formData.callDuration)) && Number(formData.callDuration) > 0) || !checkCallTimePositive;
        const isSelectedType = formData.selectedType === null;
        const isSelectedCat = formData.Selectedcategory === "" || formData.Selectedcategory === null;
        const isSelectedSubCat = formData.selectedSubCategory === null;
        const isDateTime = formData.dateTime === null;
        const isDateTimeEnd = formData.dateTimeEnd === null;
        const isPolicyNumber = formData.policyNumber === null;
        const isContactId = formData.contactID === null;
        const isTeamleader = formData.teamLeader === null;
        const isAgentName = formData.AgentName === null;
        const isRiskOfficer = formData.riskOfficer === null;
        const isSecondCall = formData.secondCall === "" || formData.secondCall === null;
        


        setFormErrors((prev) => ({
            ...prev,
            callSystem: isCallSystemValid,
            callDuration: !isCallDurationValid,
            selectedType: isSelectedType,
            Selectedcategory: isSelectedCat,
            selectedSubCategory: isSelectedSubCat,
            dateTime: isDateTime,
            dateTimeEnd: isDateTimeEnd,
            policyNumber: isPolicyNumber,
            teamLeader: isTeamleader,
            contactID: isContactId,
            AgentName: isAgentName,
            riskOfficer: isRiskOfficer,
            secondCall: isSecondCall,
            additionalCall: false,


        }));
        // const allValid = Object.values(formErrors).every((error) => error === false);

        if (allValid) {
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
            secondCall: newValue
        }));
    };

    const handleErrors = (field, value) => {
        setFormErrors((prev) => ({
            ...prev,
            [field]: value ? false : prev[field]
        }));
    };


    const categories = formData.selectedType?.categories ?? [];
    const subCategories = formData.Selectedcategory?.subCategories ?? [];


    return (

        <>
            <Box component="form"
                sx={{
                    Height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                }}
            >

                <Paper elevation={0} sx={{
                    p: 4, maxWidth: "80vw",
                    backdropFilter: "blur(10px)",
                    borderRadius: 0,
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    background: "rgb(255, 255, 255)", '& label': { color: 'Black' }, '& fieldset': { borderColor: 'black' }
                }}>

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
                                    setFormData((prev) => ({ ...prev, callSystem: newValue ? newValue.value : "" }));
                                    handleErrors("callSystem", newValue)
                                }}

                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={formErrors.callSystem}
                                        required
                                        helperText={formErrors.callSystem ? "Call system is required" : ""}
                                        FormHelperTextProps={{
                                            sx: { color: 'red' }
                                        }}
                                        label="Call System"
                                        variant="outlined" fullWidth />
                                )}
                            />



                        </Grid>

                        <Grid item size={formGrid} >

                            <Autocomplete

                                options={prodTypes}
                                getOptionLabel={(option) => option.type}
                                value={formData.selectedType}
                                onChange={(event, newValue) => {
                                    handleTypeChange(event, newValue);
                                    handleErrors("selectedType", newValue);
                                }}

                                renderInput={(params) => (
                                    <TextField {...params}
                                        error={formErrors.selectedType}
                                        helperText={formErrors.selectedType ? "Call Type is required" : ""}
                                        required
                                        label="Call Type" fullWidth />
                                )}

                            />

                        </Grid>


                        <Grid item size={formGrid} >
                            <Autocomplete
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                value={formData.Selectedcategory}
                                onChange={(event, newValue) => {
                                    handleCategoryChange(event, newValue);
                                    handleErrors("Selectedcategory", newValue);
                                }}
                                disabled={!formData.selectedType}

                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        error={formErrors.Selectedcategory}
                                        helperText={formErrors.Selectedcategory ? "Product Type is required" : ""}
                                        required
                                        label="Product Type" fullWidth />}
                            />

                        </Grid>

                        <Grid item size={formGrid} >
                            <Autocomplete
                                options={subCategories}
                                value={formData.selectedSubCategory}
                                onChange={(event, newValue) => {
                                    handleSubCatChange(event, newValue);
                                    handleErrors("selectedSubCategory", newValue);
                                }}
                                disabled={!formData.Selectedcategory}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        error={formErrors.selectedSubCategory}
                                        helperText={formErrors.selectedSubCategory ? "Sub Category is required" : ""}
                                        required
                                        label="Product Sub Cat Type" fullWidth />
                                }
                            />
                        </Grid>



                        <Grid item size={formGrid}>
                            <TextField
                                value={formData.policyNumber}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, policyNumber: e.target.value || null }));
                                    handleErrors("policyNumber", e)
                                }}
                                error={formErrors.policyNumber}
                                helperText={formErrors.policyNumber ? "Policy Number is required" : ""}
                                required
                                label="Policy Number"
                                fullWidth
                            />
                        </Grid>


                        <Grid item size={formGrid} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date & Time of Call"
                                    value={formData.dateTime}

                                    onChange={(newValue) => {
                                        setFormData((prev) => ({ ...prev, dateTime: newValue }));
                                        handleErrors("dateTime", newValue)
                                    }}


                                    slotProps={{
                                        textField: {
                                            error: formErrors.dateTime,
                                            helperText: formErrors.dateTime ? "Date & Time is required" : "",
                                            required: true,
                                            fullWidth: true,
                                        },
                                    }}
                                    sx={{
                                        width: "100%"
                                    }} />
                            </LocalizationProvider>
                        </Grid>



                        <Grid item size={formGrid}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date & Time of Call End"
                                    value={formData.dateTimeEnd}
                                    onChange={(newValue) => {
                                        setFormData((prev) => ({ ...prev, dateTimeEnd: newValue }));
                                        handleErrors("dateTimeEnd", newValue)
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: formErrors.dateTimeEnd,
                                            helperText: formErrors.dateTimeEnd ? "Date & Time End is required" : "",
                                            required: true,
                                            fullWidth: true,
                                        },
                                    }}
                                    sx={{ width: "100%" }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item size={formGrid} >
                            <TextField
                                aria-readonly
                                disabled
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        color: 'black',        // change text color
                                        WebkitTextFillColor: 'black', // ensures Safari applies it
                                        cursor: 'not-allowed',
                                    },
                                }}

                                type='number'
                                value={formData.callDuration = diffMinutes || 0}
                                error={formErrors.callDuration}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, callDuration: e.target.value }));
                                    handleErrors("callDuration", e)
                                }}

                                helperText={formErrors.callDuration ? "Call Duration is required & must be positive" : ""}
                                label="Total Call Duration(mins)" fullWidth />
                        </Grid>


                        <Grid item size={formGrid} >
                            <TextField
                                value={formData.contactID}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, contactID: e.target.value || null }))
                                    handleErrors("contactID", e)
                                }}
                                error={formErrors.contactID}
                                helperText={formErrors.contactID ? "Contact Id is required" : ""}
                                required
                                label="Contact ID"
                                fullWidth></TextField>
                        </Grid>

                        <Grid item size={formGrid} >
                            <TextField
                                value={formData.teamLeader}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, teamLeader: e.target.value || null }))
                                    handleErrors("teamLeader", e)
                                }}
                                error={formErrors.teamLeader}
                                helperText={formErrors.teamLeader ? "Team Leader is required" : ""}
                                required
                                label="Team Leader Name" fullWidth></TextField>
                        </Grid>

                        <Grid item size={formGrid} >
                            <TextField
                                value={formData.AgentName}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, AgentName: e.target.value || null }));
                                    handleErrors("AgentName", e)
                                }}
                                error={formErrors.AgentName}
                                helperText={formErrors.AgentName ? "Agent Name is required" : ""}
                                required
                                label="Agent Name" fullWidth></TextField>
                        </Grid>

                        <Grid item size={formGrid} >
                            <TextField
                                value={formData.riskOfficer}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, riskOfficer: e.target.value || null }));
                                    handleErrors("riskOfficer", e)
                                }}
                                error={formErrors.riskOfficer}
                                helperText={formErrors.riskOfficer ? "Risk Officer is required" : ""}
                                required
                                label="Risk Officer" fullWidth></TextField>
                        </Grid>


                        <Grid item size={formGrid} >
                            <Autocomplete
                                options={secondCallOption}
                                value={formData.secondCall}
                                onChange={(event, newValue) => {
                                    handleSecondcall(event, newValue);
                                    handleErrors("secondCall", newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        error={formErrors.secondCall}
                                        helperText={formErrors.secondCall ? "Second Call is required" : ""}
                                        required
                                        label="Was there a second call?" fullWidth />
                                }
                            />

                        </Grid>

                        {formData.secondCall?.value === "YES" &&


                            <Grid item size={formGrid} >
                                <TextField
                                    value={formData.additionalCall}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalCall: e.target.value }))}
                                    label="Additional Call IDs"
                                    placeholder='Enter additional call IDs separated by /'
                                    fullWidth />
                            </Grid>}


                        <Grid item size={{ md: 12, sm: 12, xs: 12 }}>
                            <Box display="flex" justifyContent="space-between">
                                <Button variant='contained' onClick={handleReset} sx={{ width: '20%', bgcolor: "white", color: "black" }}>Reset</Button>
                                <Button
                                    onClick={handleNext}
                                    variant='contained'
                                    sx={{ width: '20%', bgcolor: "white", color: "black" }}>Next</Button>
                            </Box>
                        </Grid>


                    </Grid>
                </Paper>
            </Box>



        </>
    );
}
