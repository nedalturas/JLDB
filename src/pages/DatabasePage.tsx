import { useState, useCallback } from 'react';
import Filters from "../components/Filters";
import ResultsTable from "../components/ResultsTable";

function DatabasePage() {
  const [filters, setFilters] = useState({
    city: '',
    service: '',
    search: ''
  });

  const handleFilterChange = useCallback((newFilters: {
    city: string;
    service: string;
    search: string;
  }) => {
    setFilters(newFilters);
  }, []);

  return (
    <>
      <Filters onFilterChange={handleFilterChange} />
      <ResultsTable filters={filters} />
    </>
  );
}

export default DatabasePage;