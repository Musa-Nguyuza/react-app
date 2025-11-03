import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const statusColors = {
  "Not Started": "red",
  "In Progress": "orange",
  "Completed": "green"
};


const ViewFindingTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://riskapp-backend.onrender.com/api/dispute/data').then(res => {
      const findingsList = res.data;
      const selectedFinding = findingsList.find(f => f.id === parseInt(id));

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
      <Table component={Paper} sx={{ maxHeight: 700, mt: 2 }}>
        <TableHead stickyHeader>
          <TableRow>
            <TableCell>Phrase</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Compliance</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.phrase}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.compliance}</TableCell>
              <TableCell sx={{color: 'white', 
                backgroundColor: statusColors[item.status] || 'white'
              }}>{item.status}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit-finding/${id}/${item.type}/${item.index}`)}
                variant="contained" 
                color="primary"
                >View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
};

export default ViewFindingTable;
