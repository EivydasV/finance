import CostsDialog from '../components/CostsDialog'
import { useEffect, useState } from 'react'
import IncomeDialog from '../components/IncomeDialog'
import PieChart from '../components/PieChart'
import { Container, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import SelectByDate from '../components/SelectByDate'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

export default function Home() {
  const { currentUser, getMyFinance, loading, finances, error } = useAuth()
  const router = useRouter()
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const get = async () => {
      await getMyFinance({ date: date.toISOString() })
    }
    get()
  }, [date])

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
            <SelectByDate setDate={setDate} date={date} />
          </Box>
          {loading ? (
            <CircularProgress color='secondary' />
          ) : error ? (
            <Alert severity='warning' sx={{ mt: 3 }}>
              cannot find finances with that date
            </Alert>
          ) : (
            <PieChart finances={finances} />
          )}
        </Box>
      </Container>
    </>
  )
}
