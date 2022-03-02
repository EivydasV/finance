import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { Container } from '@mui/material'
const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
}
const options = {
  maintainAspectRatio: false,
  legend: {
    position: 'right',
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
}
export default function PieChart({ finances }) {
  if (!finances) return ''
  console.log(finances.finances.map((fin) => fin._id))
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 9,
        }}
      >
        <Doughnut
          data={{
            labels: finances.finances.map((fin) => fin._id),
            datasets: [
              {
                label: 'Costs',
                data: finances.finances.map((fin) => fin.amount),
                backgroundColor: finances.finances.map((fin) => {
                  const randomNum = () =>
                    Math.floor(Math.random() * (235 - 52 + 1) + 52)

                  const randomRGB = () =>
                    `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`
                  return randomRGB()
                }),
                hoverOffset: 4,
              },
            ],
          }}
          options={{ ...options, offset: 15, maintainAspectRatio: false }}
          width={500}
          height={500}
        />
        {/* <Doughnut
          data={data}
          options={{ ...options, offset: 15, maintainAspectRatio: false }}
          width={500}
          height={500}
        /> */}
      </Container>
    </>
  )
}
