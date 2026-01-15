import React, { useState, useEffect, useContext } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, TextField,
  TablePagination, Button, Typography,
  Box
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CallLogContext } from '../../ContextPage/Context';
import data from '../../../DATA/ProdSpec.json';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import useFetchTableData from '../../viewTables/QaResults/FetchData/FetchData';

const Remediation = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const { tableData } = useFetchTableData(id, 'Remediation');

  const dataSource = id ? tableData: data;

  // ✅ Using context data instead of local state
  const { remediationTableData, setRemediationRiskTableData,setRemediationSummary, remediationSummary, formData, setFormData } = useContext(CallLogContext);
  const dateTimeoftheCall = dayjs( formData.dateTime).format('YYYY/MM/DD, HH:mm:ss');
  const DateAndTimeofRemediation = dayjs().format('YYYY/MM/DD, HH:mm:ss')


  const [selectedFilters, setSelectedFilters] = useState({ filter: '', grouping: '' });
  const [tableError, setTableError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    const stored = localStorage.getItem('tableFilters');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedFilters({ ...parsed, grouping: 'Outcome Admin' });
    } else {
      setSelectedFilters({  grouping: "Outcome Admin" });
    }
  }, []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      dateAndTimeOfRemediation: 
      remediationTableData[3]?.compliance === 'Yes'? DateAndTimeofRemediation:"",
    }));
  }, [DateAndTimeofRemediation, remediationTableData, setFormData]);


//✅ TABLE DATA PERSISTING (TESTING)
  useEffect(() => {
  if (!selectedFilters.grouping || dataSource.length === 0) return;

  // ✅ Only set data if it's empty (i.e., first load)
  if (remediationTableData.length === 0) {
    const filteredData = dataSource.filter(
      (row) => row['Operational Risk'] === selectedFilters.grouping
    );

    const mappedData = filteredData.map((item) => ({
      phrase: item.Phrase,
      compliance: 'No',
      comment: ''
    }));

    setRemediationRiskTableData(id? dataSource : mappedData);
  }
}, [selectedFilters, setRemediationRiskTableData, remediationTableData, dataSource, id]);

useEffect(()=>{
  
    // ✅ Count compliant values
    const summary = {Yes: 0, No: 0};
    remediationTableData.forEach((row)=>{
      if (summary[row.compliance] !== undefined)
      {
        summary[row.compliance]++;
      }
    })
    setRemediationSummary(summary);
    //done counting here
})


  // ✅ Update context data directly instead of local state
  const handleChange = (index, field, value) => {
    const updated = [...remediationTableData];
    updated[index][field] = value;
    setRemediationRiskTableData(updated);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async () => {
    // ✅ Validate context data instead of local state
    // const isComplete = remediationTableData.every((row) => {
    //   const hasCompliance = row.compliance === 'Yes' || row.compliance === 'No' || row.compliance === 'N/A';
    //   return hasCompliance;
    // });

    // if (!isComplete) {
    //   setTableError(true);
    //   return;
    // }


    setTableError(false);
    navigate('/adherence');

  };

  // ✅ Use context data for pagination
  const paginatedRows = remediationTableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      {tableError && (
        <Typography color="error" sx={{ mb: 2, mt: 2 }}>
          Please ensure all rows have a compliance selection.
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ maxHeight: 700, mt: 2, minWidth:750 }}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell><strong>Phrase</strong></TableCell>
              <TableCell><strong>Compliant</strong></TableCell>
              <TableCell><strong>Comment</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => {
              const realIndex = page * rowsPerPage + index;
              return (
                <TableRow key={realIndex}>
                  <TableCell sx={{ width: "50%" }}>{row.phrase}</TableCell>
                  <TableCell>
                    {row.compliance===""?row.compliance="No":
                    <Select
                      value={row.compliance}
                      onChange={(e) => handleChange(realIndex, 'compliance', e.target.value)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="No">No</MenuItem>
                      {/* <MenuItem value="N/A">N/A</MenuItem> */}
                      <MenuItem value="Yes">Yes</MenuItem>
                      
                    </Select>}
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={row.comment || ''}
                      onChange={(e) => handleChange(realIndex, 'comment', e.target.value)}
                      fullWidth
                      placeholder="Add comment"
                    />
                  </TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>


          {remediationTableData[3]?.compliance === 'Yes' && 
          <TableBody>
          <TableRow sx={{border:'1px solid red'}}>
            <TableCell>
              <label>Action Item</label>
              <TextField multiline
                 value={formData.actionItem}
                 onChange={(e) => {
                     setFormData((prev) => ({ ...prev, actionItem: e.target.value || '' }));
                 }}
                
                 required
                
               sx={{ ml:{sm:2, lg:11, xl:25}, width:{sm:'100%', lg:'60%'}}}  placeholder='write action to be taken to remediate here'/>
            </TableCell>
            <TableCell>
              <label className='font-bold'>Date and time of the call </label>
            </TableCell>
            <TableCell>
              <TextField value={dateTimeoftheCall} fullWidth/>
            </TableCell>
            </TableRow>

             <TableRow>
            <TableCell>
              <label >Date and time of remediation</label>
              <TextField value={DateAndTimeofRemediation} sx={{ ml:{sm:2, lg:11}, width:{sm:'100%', lg:'60%'}}}/>
            </TableCell>
            <TableCell>
              <label className='font-bold'>Date and time of due date</label>
            </TableCell>
            <TableCell>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={formData.dateAndTimeOfDueDate}
                  onChange={(newValue) => {
                    setFormData(prev => ({
                      ...prev,
                      dateAndTimeOfDueDate: newValue,
                    }));
                  }}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
              
            </TableCell>
          </TableRow>
            </TableBody>
           }

          <TableHead sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white", // ensure it doesn’t overlap content
            zIndex: 2, // keep it above body rows
          }}
            >
            <TableRow>
              <TableCell>
                <strong>Total Phrases: {remediationTableData.length}</strong>
              </TableCell>
              <TableCell>
                <strong>Total compliant Phrases: {remediationSummary['Yes']}</strong>
              </TableCell>
              <TableCell>
                <strong>Total Non-Compliant: {remediationSummary['No']}</strong>
              </TableCell>
              <TableCell>
                <strong>Total Completed Phrases: {remediationTableData.length}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={remediationTableData.length} /* ✅ Use context data count */
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ width: '15%', bgcolor: "white", color: "black" }}
      >
        Next
      </Button>
    </>
  );
};

export default Remediation;
