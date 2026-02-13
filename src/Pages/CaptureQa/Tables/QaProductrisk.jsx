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

const QaProdRisk = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const { tableData } = useFetchTableData(id, 'Product Risk Table');

  const dataSource = id ? tableData : data;

  // ✅ Using context data instead of local state
  const { productRiskTableData, setProductRiskTableData,setProductSummary, productSummary } = useContext(CallLogContext);

  const [selectedFilters, setSelectedFilters] = useState({ filter: '', subGrouping: '', grouping: "", });
  const [tableError, setTableError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    const stored = localStorage.getItem('tableFilters');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedFilters({ ...parsed , grouping: "Product Risk"});
    } else {
      setSelectedFilters({ filter: '', subGrouping: '', grouping: "Product Risk" });
    }
  }, []);

  useEffect(() => {
    if (!selectedFilters.grouping || dataSource.length === 0) return;

    if(productRiskTableData.length === 0){
    const filteredData = dataSource.filter(
      (row) =>
        row["Operational Risk"] === selectedFilters.grouping &&
        row['Product Sub Cat Type'] === selectedFilters.subGrouping &&
        (selectedFilters.filter ? row['Product Type'] === selectedFilters.filter : true)
    );

    const mappedData = filteredData.map((item) => ({
      phrase: item["Phrase"],
      category: item["Category"],
      compliance: 'N/A',
      comment: ''
    }));

    // ✅ Save filtered and mapped data directly to context
    setProductRiskTableData(id? dataSource : mappedData);
  };
  }, [dataSource, id, productRiskTableData, selectedFilters, setProductRiskTableData]);
  
  useEffect(()=>{
    
    // ✅ Count compliant values
    const summary = {Yes: 0, No: 0 , 'N/A': 0};
    productRiskTableData.forEach((row)=>{
      if (summary[row.compliance] !== undefined)
      {
        summary[row.compliance]++;
      }
    })
    setProductSummary(summary);
  })

  // ✅ Update context data directly instead of local state
  const handleChange = (index, field, value) => {
    const updated = [...productRiskTableData];
    updated[index][field] = value;
    setProductRiskTableData(updated);
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
    // const isComplete = productRiskTableData.every((row) => {
    //   const hasCompliance = row.compliance === 'Yes' || row.compliance === 'No' || row.compliance === 'N/A';
    //   return hasCompliance;
    // });

    // if (!isComplete) {
    //   setTableError(true);
    //   return;
    // }

    //done counting here

    setTableError(false);
    navigate(id? `/Process-Qa/${id}` : '/Process-Qa');

  };

  // ✅ Use context data for pagination
  const paginatedRows = productRiskTableData.slice(
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
              <TableCell><strong>Category</strong></TableCell>
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
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    {row.compliance===""?row.compliance="N/A":
                    <Select
                      value={row.compliance}
                      onChange={(e) => handleChange(realIndex, 'compliance', e.target.value)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="N/A">N/A</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>}
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={row.comment}
                      onChange={(e) => handleChange(realIndex, 'comment', e.target.value)}
                      fullWidth
                      placeholder="Add comment"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableHead sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white", // ensure it doesn’t overlap content
            zIndex: 2, // keep it above body rows
          }}
            >
            <TableRow>
              <TableCell>
                <strong>Total Phrases: {productRiskTableData.length}</strong>
              </TableCell>
              <TableCell>
                <strong>Total compliant Phrases: {productSummary['Yes']}</strong>
              </TableCell>
              <TableCell>
                <strong>Total Non-Compliant: {productSummary['No']}</strong>
              </TableCell>
              <TableCell>
                <strong>Total Completed Phrases: {productRiskTableData.length}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={productRiskTableData.length} /* ✅ Use context data count */
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

export default QaProdRisk;
