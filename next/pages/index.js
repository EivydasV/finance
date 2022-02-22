import CostsDialog from "../components/CostsDialog";
import IncomeDialog from "../components/IncomeDialog";
import PieChart from "../components/PieChart";
import { Container, Box } from "@mui/material";
export default function Home() {
  return (
    <>
      <Container>
        <Box marginBottom={5}>
          <Container sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <CostsDialog />
            <IncomeDialog />
          </Container>
          <PieChart />
        </Box>
      </Container>
    </>
  );
}
