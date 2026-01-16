import { useEffect, useState } from 'react';

const useFetchTableData = (id, tableKey) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://riskapp-backend.onrender.com/api/data/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setTableData(data[tableKey] || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, tableKey]);

  return { tableData, loading, error };
};

export default useFetchTableData;
