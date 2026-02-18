import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme, Typography, Box, Chip } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { apiTypes } from '../data/apiContent'

const drawerWidth = 260

const Sidebar = () => {
  const theme = useTheme()
  const location = useLocation()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const getIcon = (iconName: string) => {
    // Simple text-based icons for each API type
    const icons: Record<string, string> = {
      'Http': '🌐',
      'AccountTree': '🌲',
      'SwapHoriz': '⚡',
      'SettingsEthernet': '🔌',
      'Description': '📄'
    }
    return icons[iconName] || '📡'
  }

  const getApiColor = (id: string) => {
    const colors: Record<string, string> = {
      'rest': '#4CAF50',
      'graphql': '#E535AB',
      'websocket': '#FF9800',
      'grpc': '#2196F3',
      'soap': '#795548'
    }
    return colors[id] || '#6366f1'
  }

  const drawerContent = (
    <Box sx={{ pt: 10, px: 2 }}>
      <Typography 
        variant="overline" 
        sx={{ 
          px: 2, 
          color: 'text.secondary',
          fontWeight: 600,
          letterSpacing: 1
        }}
      >
        API Types
      </Typography>
      <List>
        {apiTypes.map((api) => {
          const isActive = location.pathname === `/${api.id}`
          return (
            <ListItem key={api.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={RouterLink}
                to={`/${api.id}`}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  },
                  borderLeft: isActive ? `3px solid ${getApiColor(api.id)}` : '3px solid transparent',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, fontSize: '1.5rem' }}>
                  {getIcon(api.icon)}
                </ListItemIcon>
                <ListItemText 
                  primary={api.name}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'text.primary' : 'text.secondary'
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getApiColor(api.id)
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box sx={{ mt: 4, px: 2 }}>
        <Typography variant="caption" color="text.secondary">
          💡 Tip: Start with REST for the fundamentals, then explore other protocols based on your needs.
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop ? true : undefined}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          display: { xs: 'none', md: 'block' }
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export default Sidebar
