import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Container } from "@mui/material";
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
const options = {
  legend: {
    position: "right",
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};
export default function PieChart() {
  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 9 }}
      >
        <Doughnut data={data} options={{ ...options, offset: 15 }} />
        <Doughnut data={data} options={{ ...options, offset: 15 }} />
      </Container>
    </>
  );
}
