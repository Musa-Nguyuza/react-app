import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  TablePagination,
  Button,
  Typography,
  TableFooter,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { CallLogContext } from "../../ContextPage/Context";
import data from "../../../DATA/Phrases.json";

import useFetchTableData from "../../viewTables/QaResults/FetchData/FetchData";

const Regulatory = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const { tableData } = useFetchTableData(id, 'Regulatory Table');

  const dataSource = id ? tableData : data;

  

  // ✅ Using context data instead of local state
  const {
    regulatoryTableData,
    setRegulatoryTableData,
    setRegulatorySummary,
    regulatorySummary,
    holdFilter,
    setHoldFilter,
    setMarketConductTableData,
    setProductRiskTableData,
    setProcessTableData,
    setCustomerExperienceTableData,
    setRemediationRiskTableData,
  } = useContext(CallLogContext);

  

  const [selectedFilters, setSelectedFilters] = useState({
    filter: "",
    subGrouping: '',
    grouping: "",
  });
  const [tableError, setTableError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  //EDITING HERE
  

  useEffect(() => {
    const stored = localStorage.getItem("tableFilters");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedFilters({ ...parsed, grouping: "Regulatory" });
    } else {
      setSelectedFilters({ filter: "", subGrouping: '', grouping: "Regulatory" });
    }
  }, []);

  useEffect(() => {
    if (!selectedFilters.grouping || dataSource.length === 0) return;
    if (holdFilter.filter !== selectedFilters.filter || holdFilter.subGrouping !== selectedFilters.subGrouping) {
      setRegulatoryTableData([]);
      setMarketConductTableData([]),
        setProductRiskTableData([]),
        setProcessTableData([]),
        setCustomerExperienceTableData([]),
        setRemediationRiskTableData([]);
      //setHoldFilter(selectedFilters.filter,selectedFilters.subGrouping);
      setHoldFilter(prev => ({...prev,
     filter: selectedFilters.filter,
     subGrouping: selectedFilters.subGrouping
    }));
      return;
    }

    // ✅ Only set data if it's empty (i.e., first load)
    if (regulatoryTableData.length === 0) {
      const filteredData = dataSource.filter(
        (row) =>
          row["Compliance Grouping"] === selectedFilters.grouping &&
          (selectedFilters.filter
            ? row["Product Type"] === selectedFilters.filter
            : true)
      );

      const mappedData = filteredData.map((item) => ({
        phrase: item["Phrase"],
        category: item["Category Phrase List"],
        compliance: "N/A",
        comment: "",
      }));

      setRegulatoryTableData(id? dataSource : mappedData);

     
    }
  }, [selectedFilters, setRegulatoryTableData, regulatoryTableData, holdFilter, setHoldFilter, setMarketConductTableData, setProductRiskTableData, setProcessTableData, setCustomerExperienceTableData, setRemediationRiskTableData, dataSource, id, setRegulatorySummary]);


  // ✅ Update context data directly instead of local state
  const handleChange = (index, field, value) => {
    const updated = [...regulatoryTableData];
    updated[index][field] = value;
    setRegulatoryTableData(updated);

  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //✅ count values
  useEffect(()=>{
     const summary = { Yes: 0, No: 0, "N/A": 0 };
    regulatoryTableData.forEach((row) => {
      if (summary[row.compliance] !== undefined) {
        summary[row.compliance]++;
      }
    });
    setRegulatorySummary(summary);
  })

  const handleSubmit = async () => {
    //✅ Validate context data instead of local state
    // const isComplete = regulatoryTableData.every((row) => {
    //   const hasCompliance = row.compliance === 'Yes' || row.compliance === 'No' || row.compliance === 'N/A';
    //   return hasCompliance;
    // });

    // if (!isComplete) {
    //   setTableError(true);
    //   return;
    // }


    setTableError(false);
    navigate(id ? `/MarketConduct/${id}`:"/MarketConduct" );
  };

  // ✅ Use context data for pagination
  const paginatedRows = regulatoryTableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );




  return (
    <>
      {tableError && (
        <Typography color="error" sx={{ mb: 2, mt: 2 }}>
          Please ensure all compliant rows are filled.
        </Typography>
      )}
      
      
      <TableContainer component={Paper} sx={{ maxHeight: 700, mt: 2 }}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Phrase</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Compliant</strong>
              </TableCell>
              <TableCell>
                <strong>Comment</strong>
              </TableCell>
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
                    
                      value={row.compliance }
                      onChange={(e) =>
                        handleChange(realIndex, "compliance", e.target.value)
                      }
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="N/A"> N/A</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select> }
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={row.comment}
                      onChange={(e) =>
                        handleChange(realIndex, "comment", e.target.value)
                      }
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
                <strong>Total Phrases: {regulatoryTableData.length}</strong>
              </TableCell>
              <TableCell>
                <strong>Total compliant Phrases: {regulatorySummary['Yes']}</strong>
              </TableCell>
              <TableCell>
                <strong>Total Non-Compliant: {regulatorySummary['No']}</strong>
              </TableCell>
              <TableCell>
                <strong>Total Completed Phrases: {regulatoryTableData.length}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        
      </TableContainer>

      <TablePagination
        component="div"
        count={regulatoryTableData.length} /* ✅ Use context data count */
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ width: "15%", bgcolor: "white", color: "black" }}
      >
        Next
      </Button>
    </>
  );
};

export default Regulatory;
