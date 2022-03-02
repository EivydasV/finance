import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../context/AuthContext'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const { loading, logout, currentUser } = useAuth()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <AppBar position='fixed'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {currentUser && (
                  <Link href={'/'} passHref>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>Home</Typography>
                    </MenuItem>
                  </Link>
                )}
                {!currentUser && (
                  <Link href={'/login'} passHref>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>Login</Typography>
                    </MenuItem>
                  </Link>
                )}

                {/* {currentUser && currentUser?.user?.roles?.includes('admin') && (
                  <Link href={'/admin'} passHref>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>Admin</Typography>
                    </MenuItem>
                  </Link>
                )} */}
              </Menu>
            </Box>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            {currentUser && (
              <Button
                onClick={logout}
                sx={{
                  my: 2,
                  color: 'white',
                  display: { xs: 'flex', md: 'none' },
                }}
                variant='contained'
                color='error'
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            )}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {currentUser && (
                <Link href={'/'} passHref>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Home
                  </Button>
                </Link>
              )}
              {!currentUser && (
                <Link href={'/login'} passHref>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Login
                  </Button>
                </Link>
              )}
              {/* {currentUser && currentUser?.user?.roles?.includes('admin') && (
                <Link href={'/admin'} passHref>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Admin
                  </Button>
                </Link>
              )} */}
              {currentUser && (
                <Button
                  // onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', ml: 'auto' }}
                  variant='contained'
                  color='error'
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
export default ResponsiveAppBar
