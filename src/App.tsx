import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { HeaderSimple } from "./components/HeaderSimple";
import Filters from "./components/Filters";
import ResultsTable from "./components/ResultsTable";

export default function App() {
  return (
    <>
      <MantineProvider theme={theme}>

        <HeaderSimple />
        <Filters />
        <ResultsTable />
      </MantineProvider>;

    </>
  )
}
