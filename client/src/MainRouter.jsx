import { useCallback, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import Home from './core/Home.jsx'
import RosterPage from './components/Roster.jsx'
import JoinPage from './components/JoinForm.jsx'
import PhotosPage from './components/PhotosPage.jsx'
import emblem from './assets/images/cdeEmblem.jpg'
import { BRAND_RED, GUILD_NAME } from './guildConfig.js'

const MainRouter = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')

  const onAuth = useCallback((value) => {
    if (value) localStorage.setItem('token', value)
    else localStorage.removeItem('token')
    setToken(value)
  }, [])

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: BRAND_RED }}>
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
        <Box component="img" src={emblem} alt="" sx={{ height: 44, width: 44, borderRadius: '50%' }} />
        <Typography component="span" variant="h6" sx={{ flexGrow: 1 }}>Chug.exe</Typography>
          <Box component={Link} to="/" aria-label={`${GUILD_NAME} home`} sx={{ display: 'flex', mr: 1 }}>
          </Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/roster">Roster</Button>
          <Button color="inherit" component={Link} to="/join">Join the guild</Button>
          <Button color="inherit" component={Link} to="/photos">Photos</Button>
          {token && <Button color="inherit" onClick={() => onAuth('')}>Sign out</Button>}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="*" element={
            <Stack spacing={2}>
              <Typography component="h1" variant="h4">Page not found</Typography>
              <Button component={Link} to="/">Return home</Button>
            </Stack>
          } />
        </Routes>
      </Container>
    </>
  )
}

export default MainRouter
