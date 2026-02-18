import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import QuizIcon from '@mui/icons-material/Quiz'
import CodeIcon from '@mui/icons-material/Code'

const NavBar = () => {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <IconButton
          component={RouterLink}
          to="/"
          sx={{ 
            color: 'primary.main',
            '&:hover': { backgroundColor: 'rgba(99, 102, 241, 0.1)' }
          }}
        >
          <CodeIcon fontSize="large" />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component={RouterLink}
          to="/"
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          API Learning Hub
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              color: isActive('/') ? 'primary.main' : 'text.secondary',
              fontWeight: isActive('/') ? 600 : 400,
              '&:hover': { color: 'primary.main' }
            }}
          >
            Home
          </Button>
          
          <Button
            component={RouterLink}
            to="/compare"
            startIcon={<CompareArrowsIcon />}
            sx={{
              color: isActive('/compare') ? 'primary.main' : 'text.secondary',
              fontWeight: isActive('/compare') ? 600 : 400,
              '&:hover': { color: 'primary.main' },
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Compare
          </Button>
          
          <Button
            component={RouterLink}
            to="/quiz"
            startIcon={<QuizIcon />}
            sx={{
              color: isActive('/quiz') ? 'primary.main' : 'text.secondary',
              fontWeight: isActive('/quiz') ? 600 : 400,
              '&:hover': { color: 'primary.main' }
            }}
          >
            Quiz
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
