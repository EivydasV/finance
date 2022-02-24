import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import AdminTable from "../components/AdminTable";
export default function Admin() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h3" marginBottom={2}>
          Admin Table
        </Typography>
        <AdminTable />
      </Container>
    </>
  );
}
