import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchTableData from '../FetchData/FetchData';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Typography, Button
} from '@mui/material';

const ViewRegulatory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tableData, loading, error } = useFetchTableData(id, 'Regulatory Table');
  const tableName= 'Regulatory Table';

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 700, mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Phrase</strong></TableCell>
              <TableCell><strong>Phrase Found</strong></TableCell>
              <TableCell><strong>Comment</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{width:'60%'}}>{row.phrase}</TableCell>
                <TableCell sx={{width:'10%',
                  color: "white",
                  textAlign:'center',
                  backgroundColor: row.compliance == "Yes" ? "green" : row.compliance == "No" ? "red" : row.compliance == "N/A" ? "gray" : "black",
                }}>{row.compliance}</TableCell>
                <TableCell sx={{width:'30%',}}>{row.comment}</TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/view-phrase/${id}/${index}/${encodeURIComponent(tableName)}`)}
                        sx={{ mr: 1 }}
                        >
                        View
                    </Button>
                </TableCell>
              </TableRow>
            ))}
            {tableData.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={tableData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Button 
        variant="contained" 
        sx={{ width: "15%", bgcolor: "white", color: "black" }} 
        onClick={() => navigate(`/view-market_conduct/${id}`)}>
        Next
      </Button>
    </>
  );
};

export default ViewRegulatory;
