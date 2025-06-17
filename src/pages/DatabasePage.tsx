import { useState } from 'react';
import Filters from "../components/Filters";
import ResultsTable from "../components/ResultsTable";

function DatabasePage() {
  const [filters, setFilters] = useState({
    city: '',
    service: '',
    search: ''
  });

  const handleFilterChange = (newFilters: {
    city: string;
    service: string;
    search: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Filters onFilterChange={handleFilterChange} />
      <ResultsTable />
    </>
  );
}

export default DatabasePage;