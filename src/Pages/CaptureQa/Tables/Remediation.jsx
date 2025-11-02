import React, { useState, useEffect, useContext } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, TextField,
  TablePagination, Button, Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CallLogContext } from '../../ContextPage/Context';
import data from '../../../DATA/ProdSpec.json';

import useFetchTableData from '../../viewTables/QaResults/FetchData/FetchData';

const Remediation = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const { tableData } = useFetchTableData(id, 'Remediation');

  const dataSource = id ? tableData: data;

  // ✅ Using context data instead of local state
  const { remediationTableData, setRemediationRiskTableData,setRemediationSummary } = useContext(CallLogContext);

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

  //❌ Original
  // useEffect(() => {
  //   if (!selectedFilters.grouping || data.length === 0) return;

  //   const filteredData = data.filter(
  //     (row) =>
  //        row['Operational Risk'] === selectedFilters.grouping
  //   );

  //   const mappedData = filteredData.map((item) => ({
  //     phrase: item.Phrase,
  //     compliance: '',
  //     comment: ''
  //   }));

  //   // ✅ Save filtered and mapped data directly to context
  //   setRemediationRiskTableData(mappedData);
  // }, [selectedFilters, setRemediationRiskTableData]);

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
      compliance: '',
      comment: ''
    }));

    setRemediationRiskTableData(id? dataSource : mappedData);
  }
}, [selectedFilters, setRemediationRiskTableData, remediationTableData, dataSource, id]);


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

    // ✅ Count compliant values
    const summary = {Yes: 0, No: 0 , 'N/A': 0};
    remediationTableData.forEach((row)=>{
      if (summary[row.compliance] !== undefined)
      {
        summary[row.compliance]++;
      }
    })
    setRemediationSummary(summary);
    //done counting here

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

      <TableContainer component={Paper} sx={{ maxHeight: 700, mt: 2 }}>
        <Table stickyHeader>
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
                    <Select
                      value={row.compliance}
                      onChange={(e) => handleChange(realIndex, 'compliance', e.target.value)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="N/A">N/A</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
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
