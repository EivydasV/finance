import CostsDialog from '../components/CostsDialog'
import { useEffect } from 'react'
import IncomeDialog from '../components/IncomeDialog'
import PieChart from '../components/PieChart'
import { Container, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import SelectByDate from '../components/SelectByDate'

export default function Home() {
  const { currentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) return router.replace('/login')
  }, [currentUser])
  return (
    <>
      <Container>
        <Box>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              justifyItems: 'center',
            }}
          >
            <CostsDialog />
            <IncomeDialog />
          </Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <SelectByDate />
          </Box>
          <PieChart />
        </Box>
      </Container>
    </>
  )
}
