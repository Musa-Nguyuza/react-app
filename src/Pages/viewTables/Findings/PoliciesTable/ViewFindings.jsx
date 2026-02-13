import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination,
  Box, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import dayjs from 'dayjs';


const ViewFindings = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [data,setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  fetch('http://localhost:3001/api/dispute/data')
    .then((res) => res.json())
    .then((data)=> setData(data))
    .catch((err) => {
      window.alert('Error fetching data: ' + err.message);
    });
}, []);


  
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const paginatedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const filteredData = data.filter((row) =>
  row.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
    <Box mb={2} sx={{mt:4, backgroundColor:'white'}}>
      <Paper elevation={1} sx={{p:2}}>
        <TextField
          variant="outlined"
          placeholder="Enter Policy number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{minWidth:'220px', width: '20%', border: '1px solid black' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>

    </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Created On</strong></TableCell>
              <TableCell><strong>Policy Number</strong></TableCell>
              <TableCell><strong>Product Type</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Agent Name</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell>{item['createdOn']}</TableCell>
                <TableCell>{item['policyNumber']}</TableCell>
                <TableCell>{item['Selectedcategory']}</TableCell>
                <TableCell sx={{}}>
                    {item['Selectedcategory']}
                </TableCell>
                <TableCell>{item['AgentName']}</TableCell>
                <TableCell>{dayjs().diff(dayjs(item['createdOn']), 'day')} days</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/view/finding/details/${item.id}`)} 
                    sx={{ mr: 1 }}
                  >
                    <ArrowCircleRightOutlinedIcon sx={{ fontSize: 32 }} /> 
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>No data available</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </>
  );
};

export default ViewFindings;
