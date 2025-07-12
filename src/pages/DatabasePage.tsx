import { useState, useCallback } from 'react';
import Filters from "../components/Filters";
import ResultsTable from "../components/ResultsTable";

function DatabasePage() {
  const [filters, setFilters] = useState({
    city: '',
    service: '',
    search: ''
  });
  const [sheetData, setSheetData] = useState<any[]>([]);

  const handleFilterChange = useCallback((newFilters: {
    city: string;
    service: string;
    search: string;
  }) => {
    setFilters(newFilters);
  }, []);

  const handleDataLoad = useCallback((data: any[]) => {
    setSheetData(data);
  }, []);

  return (
    <>
      <Filters data={sheetData} onFilterChange={handleFilterChange} />
      <ResultsTable filters={filters} onDataLoad={handleDataLoad} />
    </>
  );
}

export default DatabasePage;