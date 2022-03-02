import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import AdminTable from '../components/AdminTable'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function Admin() {
  const { currentUser, loading } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (!currentUser && !currentUser?.roles.includes('admin'))
  //     return router.replace('/login')
  // }, [currentUser])
  return (
    <>
      <Container maxWidth='lg'>
        <Typography variant='h3' marginBottom={2}>
          Admin Table
        </Typography>

        {!loading && <AdminTable />}
      </Container>
    </>
  )
}
