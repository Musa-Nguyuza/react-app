import React,{useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchTableData from '../../FetchData/FetchData';
import { Typography, Button, Paper, Grid, Box } from '@mui/material';

const ViewPhrase = () => {
  const { id, index, tableName } = useParams();
  const decodedTableName = decodeURIComponent(tableName);
  const navigate = useNavigate();
  const { tableData, loading, error } = useFetchTableData(id, decodedTableName);

  const [metaData, setMetaData] = useState({ 
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
    });


  useEffect(() => {
    // Fetch the full object to extract Contact ID and Policy Number
    fetch(`http://localhost:3001/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMetaData({
            contactId: data['Contact ID'],
            policyNumber: data['Policy Number'],
            callSystem: data['Call System'],
            dateTime: data["Date & Time of call"],
            dateTimeEnd: data["Date & Time of call end"],
            selectedType: data['Call Type'],
            Selectedcategory: data['Product Type'],
            selectedSubCategory: data['Product Subcat Type'],
            secondCall: data['Second Call'],
            additionalCall: data['Additional Call IDs'],
            AgentName: data['Agent Name'],
            riskOfficer: data['Risk Officer Name'],
            teamLeader: data['Team Leader Name'],
            callDuration: data['Total call duration']
        
        });
      })
      .catch((err) => console.error('Failed to fetch metadata:', err));
  }, [id]);


  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const row = tableData[parseInt(index)];

  //get the id/tablename and index in dispute.json
const handleViewFinding = async (phrase, policyNumber) => {
  try {
    const res = await fetch('https://riskapp-backend.onrender.com/api/find-phrase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phrase, policyNumber })
    });

    const data = await res.json();

    // if (res.ok && data.id && data.tableName && data.index !== undefined) {
    //   navigate(`/edit-finding/${data.id}/${data.tableName}/${data.index}`);
    if (res.ok && data.id !== undefined) {
      navigate(`/edit-finding/${data.id}`);
    } else {
      console.error('Invalid response:', data);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};



  if (!row) return <Typography>No phrase found for this entry.</Typography>;



  return (
    <Paper sx={{ padding: 3, mt:4 }}>
      <Typography variant="h6" sx={{mb:2}}>Phrase Detail</Typography>

      <Typography><strong>Contact ID:</strong> {metaData.contactId}</Typography>
      <Typography><strong>Policy Number:</strong> {metaData.policyNumber}</Typography>
      <Typography><strong>Call System:</strong> {metaData.callSystem}</Typography>
      <Typography><strong>Call Type:</strong> {metaData.selectedType}</Typography>
      <Typography><strong>Product Type:</strong> {metaData.Selectedcategory}</Typography>
      <Typography><strong>Product Sub Category:</strong> {metaData.selectedSubCategory}</Typography>
      <Typography><strong>Agent Name:</strong> {metaData.AgentName}</Typography>
      <Typography><strong>Risk Officer Name:</strong> {metaData.riskOfficer}</Typography>
      <Typography><strong>Team Leader Name:</strong> {metaData.teamLeader}</Typography>
      <Typography><strong>Call Duration:</strong> {metaData.callDuration}</Typography>
      <Typography><strong>Second Call:</strong> {metaData.secondCall}</Typography>
      <Typography><strong>Additional Call:</strong> {metaData.additionalCall}</Typography>
      <Typography><strong>Date & Time of call:</strong> {metaData.dateTime}</Typography>
      <Typography><strong>Date & Time of call end:</strong> {metaData.dateTimeEnd}</Typography>
      

      <Typography sx={{ mt: 2 }}><strong>Phrase:</strong> {row.phrase}</Typography>
      <Typography sx={{ mt: 2 }}><strong>Category:</strong> {row.category}</Typography>
      <Typography sx={{ mt: 2 }}><strong>Phrase Found:</strong> {row.compliance}</Typography>
      <Typography sx={{ mt: 2 }}><strong>Comment:</strong> {row.comment}</Typography>

      
    <Grid container>
    <Grid item size={{lg:12,md:6,xs:6,sm:6}}>
      <Box display="flex" justifyContent="space-between">
        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>

        {/* Click to navigate to finding where the exact phrase is */}
        {row.compliance ==="No" &&
        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => handleViewFinding(row.phrase, metaData.policyNumber)}> 
          Action Remedial
        </Button>
        }
        
      </Box>
    </Grid>
    </Grid>

      
    </Paper>
  );
};

export default ViewPhrase;
