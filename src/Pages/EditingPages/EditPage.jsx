import { useEffect, useContext, useState } from 'react';
import {
  Box, Grid, TextField, Paper, Button, Autocomplete
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import ProductData from '../../DATA/ProductTypes.json';
import { CallLogContext } from '../ContextPage/Context';
 

const prodTypes = ProductData.productTypes;

const callSystemOptions = [
  { label: "Aws Connect", value: "AWS Connect" },
  { label: "Nice Call", value: "Nice Call" },
  { label: "Connex One", value: "Connex One" },
  { label: "Process Audit", value: "Process Audit" }
];

const secondCallOption =[ 
    {label:"YES", value:"YES"},
    {label:"NO", value:"NO"}
]

export default function EditPage() {
  const { id } = useParams();
  //const isEditMode = Boolean(id)
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState({
  selectedType: null,
  Selectedcategory: '',
  selectedSubCategory: null});

  const {formData, setFormData,setRegulatoryTableData,
      setMarketConductTableData,
        setProductRiskTableData,
        setProcessTableData,
        setCustomerExperienceTableData,
        setRemediationRiskTableData} = useContext(CallLogContext);


    useEffect(() => {
      // Fetch the full object to extract Contact ID and Policy Number
      fetch(`http://localhost:3001/api/data/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOriginalData((prevData) =>({
            ...prevData,
            selectedType: data['Call Type'] ,
            Selectedcategory: data['Product Type'] ,
            selectedSubCategory: data['Product Subcat Type'],
          }));
          
        setFormData((prevData) => ({
                ...prevData,

              contactID: data['Contact ID'],
              policyNumber: data['Policy Number'],
              callSystem: data['Call System'],
              dateTime:dayjs( data["Date & Time of call"]),
              dateTimeEnd:dayjs( data["Date & Time of call end"]),
              selectedType: data['Call Type'] ,
              Selectedcategory: data['Product Type'] ,
              selectedSubCategory: data['Product Subcat Type'],
              secondCall: data['Second Call'],
              additionalCall: data['Additional Call IDs'],
              AgentName: data['Agent Name'],
              riskOfficer: data['Risk Officer Name'],
              teamLeader: data['Team Leader Name'],
              callDuration: data['Total call duration']
          
          }));
        })
        .catch((err) => console.error('Failed to fetch metadata:', err));
    }, [id, setFormData]);

  //const categories = formData.selectedType?.categories ?? [];
  //const subCategories = formData.Selectedcategory?.subCategories ?? []; 
  

  const handleNext = () => {
    const filters = {
      filter: formData.Selectedcategory || '',
      grouping: 'Regulatory',
    };
    setRegulatoryTableData([]);
      setMarketConductTableData([]),
        setProductRiskTableData([]),
        setProcessTableData([]),
        setCustomerExperienceTableData([]),
        setRemediationRiskTableData([])

    localStorage.setItem('tableFilters', JSON.stringify(filters));
    navigate(`/capture-form/Regulatory/${id}`);

  };

  const handleTypeChange = (event, newValue) => {
  setFormData((prev) => ({
    ...prev,
    selectedType: newValue?.type || null,
    Selectedcategory: null,
    selectedSubCategory: null,
  }));
};

  const handleCategoryChange = (event, newValue) => {
    setFormData((prev) => ({
        ...prev,
        Selectedcategory: newValue?.name || null,
        selectedSubCategory: null,
    }));
    };

    const handleSubCatChange = (event, newValue) => {
    setFormData((prev) => ({
        ...prev,
        selectedSubCategory: newValue || null,
    }));
    };

    

  return (
    <>

      <Box component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          marginTop: "5%"
        }}
      >
        <Paper elevation={0} sx={{
          p: 4,
          width: '100%',
          maxWidth: "80vw",
          backdropFilter: "blur(10px)",
          borderRadius: 0,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          background: "rgb(255, 255, 255)",
          '& label': { color: 'Black' },
          '& fieldset': { borderColor: 'black' }
        }}>
          <Grid container spacing={2}>
            <Grid item size={{md:6}}>
              <Autocomplete
                options={callSystemOptions}
                value={callSystemOptions.find(opt => opt.value === formData.callSystem) || null}
                onChange={(e, newValue) => setFormData((prev) =>  ({ ...prev, callSystem:newValue ? newValue.value : ''}))}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} required label="Call System" fullWidth />
                )}
              />
            </Grid>

            <Grid item size={{md:6}}>
              <Autocomplete
                options={prodTypes}
                getOptionLabel={(option)=> option.type}
                value={prodTypes.find((opt)=> opt.type === formData.selectedType) || null}
                onChange={handleTypeChange}
                renderInput={(params)=>
                (
                  <TextField {...params} label="Call Type" fullWidth/>
                )
                }
              />
            </Grid>

            <Grid item size={{md:6}}>
              <Autocomplete
                options={prodTypes.find((opt) => opt.type === formData.selectedType)?.categories ||[]}
                getOptionLabel={(option) => option.name}
                value={prodTypes.find((opt) => opt.type === formData.selectedType)
                  ?.categories.find((cat) => cat.name === formData.Selectedcategory) || null}
                onChange={handleCategoryChange}
                disabled={!formData.selectedType}
                renderInput={(params) => (
                  <TextField {...params} label="Product Type" fullWidth />
                )}
              />
            </Grid>

            <Grid item size={{md:6}}>
              <Autocomplete
                options={prodTypes.find((opt)=> opt.type === formData.selectedType)
                  ?.categories.find((cat)=> cat.name === formData.Selectedcategory)
                  ?.subCategories || null
                }
                getOptionLabel={(option) => option}
                value={formData.selectedSubCategory || null}
                onChange={handleSubCatChange}
                disabled={!formData.Selectedcategory}
                renderInput={(params) => (
                  <TextField {...params} label="Product Sub Cat Type" fullWidth />
                )}
              />
            </Grid>
          

            <Grid item size={{md:6}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date & Time of Call"
                  value={formData.dateTime}
                  onChange={(newValue) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              dateTime: newValue 
                            }))
                          }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                 sx={{ width:"100%"}}/>
              </LocalizationProvider>
            </Grid>

            <Grid item size={{md:6}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date & Time of Call End"
                  value={formData.dateTimeEnd}
                  onChange={(newValue) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              dateTimeEnd: newValue
                            }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width:"100%"}}/>
              </LocalizationProvider>
            </Grid> 


            <Grid item size={{md:6}}>
              <TextField value={formData.policyNumber} 
              InputLabelProps={{shrink:true}}
              label="Policy Number" fullWidth />
            </Grid>
            <Grid item size={{md:6}}>
              <TextField value={formData.contactID} 
              InputLabelProps={{shrink:true}}
              label="Contact ID" fullWidth />
            </Grid>
            <Grid item size={{md:6}}>
              <TextField value={formData.AgentName}InputLabelProps={{shrink:true}} label="Agent Name" fullWidth />
            </Grid>
            <Grid item size={{md:6}}>
              <TextField value={formData.riskOfficer} InputLabelProps={{shrink:true}} label="Risk Officer Name" fullWidth />
            </Grid>
            <Grid item size={{md:6}}>
              <TextField value={formData.teamLeader} InputLabelProps={{shrink:true}} label="Team Leader Name" fullWidth />
            </Grid>
            <Grid item size={{md:6}}>
              <TextField value={formData.callDuration} label="Total Call Duration" fullWidth />
            </Grid>

            <Grid item size={{md:6}}>
              <Autocomplete
                options={secondCallOption}
                value={secondCallOption.find(opt => opt.value === formData.secondCall) || null}
                onChange={(e, newValue) => setFormData((prev) =>  ({ ...prev, secondCall:newValue ? newValue.value : ''}))}
                getOptionLabel={(option) => option.label}
                
                renderInput={(params) => (
                  <TextField  {...params} required label="Was there a second call?" fullWidth />
                )}
              />
            </Grid>
            {formData.secondCall === "YES" &&
                    
                    <Grid item size={{md:6}} >
                        <TextField 
                        InputLabelProps={{shrink:true}}
                        value={formData.additionalCall}
                        onChange={(e) =>setFormData((prev)=> ({...prev, additionalCall: e.target.value }))}
                        label="Additional Call IDs" 
                        placeholder='Enter additional call IDs separated by /' fullWidth/>

                        
                    </Grid>}

            <Grid item size={{md:12}} mt={2}>
              <Button
                onClick={handleNext}
                variant='contained'

                sx={{ width: '20%', bgcolor: "white", color: "black" }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
