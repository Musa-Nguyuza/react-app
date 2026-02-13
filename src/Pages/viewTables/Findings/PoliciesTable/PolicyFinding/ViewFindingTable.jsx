import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination, Paper,
  TableContainer
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const statusColors = {
  "Not Started": "red",
  "In Progress": "orange",
  "Completed": "green"
};


const ViewFindingTable = () => {
  const [initialData, setInitialData]= useState([])
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/dispute/data').then(res => {
      const findingsList = res.data;
      const selectedFinding = findingsList.find(f => f.id === parseInt(id));
      setInitialData(selectedFinding)

      if (!selectedFinding) {
        console.error('No finding found with ID:', id);
        return;
      }

      const combined = [
        ...selectedFinding.FindingRegulatory.map((f, index) => ({ ...f, type: 'FindingRegulatory', index })),
        ...selectedFinding.FindingMarket.map((f, index) => ({ ...f, type: 'FindingMarket', index })),
        ...selectedFinding.FindingProduct.map((f, index) => ({ ...f, type: 'FindingProduct', index })),
        ...selectedFinding.FindingProcess.map((f, index) => ({ ...f, type: 'FindingProcess', index })),
        ...selectedFinding.FindingCustomer.map((f, index) => ({ ...f, type: 'FindingCustomer', index })),
      ];

      setData(combined);
    });
  }, [id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 700, mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
          <TableRow>
            <TableCell>
              <strong>Phrase</strong> 
            </TableCell>
            <TableCell><strong>Category</strong> </TableCell>
            <TableCell><strong>Compliance</strong> </TableCell>
            <TableCell><strong>Status</strong> </TableCell>
            {/* <TableCell>Action</TableCell> */}
          </TableRow>
          </TableHead>
       
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.phrase}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.compliance}</TableCell>
              <TableCell sx={{color: 'white', 
                backgroundColor: statusColors[initialData.Status] || 'white'
              }}>{initialData.Status}</TableCell>
              <TableCell>
                {/* <Button onClick={() => navigate(`/edit-finding/${id}/${item.type}/${item.index}`)}
                variant="contained" 
                color="primary"
                >View</Button> */}
              </TableCell>
            </TableRow>
          ))}
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
        rowsPerPageOptions={[10, 25, 50,100]}
      />
      <Button
        variant="contained"
        onClick={() => navigate(`/edit-finding/${id}`)}
        sx={{ width: "15%", bgcolor: "white", color: "black" }}
      >
        Action Required
      </Button>
    </>
  );
};

export default ViewFindingTable;
