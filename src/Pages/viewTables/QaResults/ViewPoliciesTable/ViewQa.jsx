import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination, TextField,
  InputAdornment, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const ViewQa = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [data,setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');


useEffect(() => {
  fetch('https://riskapp-backend.onrender.com/api/data')
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
  row['Policy Number'].toLowerCase().includes(searchTerm.toLowerCase())
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
          sx={{ width: '20%', border: '1px solid black' }}
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
              <TableCell><strong>Policy Number</strong></TableCell>
              <TableCell><strong>Call Type</strong></TableCell>
              <TableCell><strong>Agent Name</strong></TableCell>
              <TableCell><strong>Risk Officer</strong></TableCell>
              <TableCell><strong>Product Type</strong></TableCell>
              <TableCell><strong>Product Subcat Type</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell>{item['Policy Number']}</TableCell>
                <TableCell>{item['Call Type']}</TableCell>
                <TableCell>{item['Agent Name']}</TableCell>
                <TableCell>{item['Risk Officer Name']}</TableCell>
                <TableCell>{item['Product Type']}</TableCell>
                <TableCell>{item['Product Subcat Type']}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/view-regulatory/${item.id}`)} ///view/${item.id}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/edit/${item.id}`)}
                  >
                    Edit
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

export default ViewQa;
