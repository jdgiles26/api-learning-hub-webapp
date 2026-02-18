import { Typography, Box, Grid, Card, CardContent, Button, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import CodeIcon from '@mui/icons-material/Code'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import SchoolIcon from '@mui/icons-material/School'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { apiTypes, learningTips } from '../data/apiContent'

const HomePage = () => {
  const getApiEmoji = (id: string) => {
    const emojis: Record<string, string> = {
      'rest': '🌐',
      'graphql': '🌲',
      'websocket': '⚡',
      'grpc': '🔌',
      'soap': '📄'
    }
    return emojis[id] || '📡'
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 4, md: 8 },
          px: 2,
          mb: 6,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
          borderRadius: 4,
          border: '1px solid rgba(99, 102, 241, 0.2)',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          API Learning Hub
        </Typography>
        
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: 'auto', mb: 4, lineHeight: 1.6 }}
        >
          Master modern API protocols through interactive lessons, 
          real-world examples, and hands-on comparisons
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to="/rest"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              },
            }}
          >
            Start Learning
          </Button>
          
          <Button
            component={RouterLink}
            to="/compare"
            variant="outlined"
            size="large"
            startIcon={<CompareArrowsIcon />}
            sx={{ px: 4, py: 1.5, borderRadius: 3 }}
          >
            Compare APIs
          </Button>
        </Box>
      </Box>

      {/* API Types Grid */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CodeIcon color="primary" />
        Explore API Types
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {apiTypes.map((api) => (
          <Grid item xs={12} sm={6} md={4} key={api.id}>
            <Card
              component={RouterLink}
              to={`/${api.id}`}
              sx={{
                height: '100%',
                textDecoration: 'none',
                backgroundColor: 'background.paper',
                border: `1px solid ${api.color}30`,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px -12px ${api.color}30`,
                  borderColor: api.color,
                  '& .api-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: api.color,
                }}
              />
              
              <CardContent sx={{ p: 3 }}>
                <Box
                  className="api-icon"
                  sx={{
                    fontSize: '3rem',
                    mb: 2,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {getApiEmoji(api.id)}
                </Box>

                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
                  {api.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {api.description.slice(0, 120)}...
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={api.transport}
                    size="small"
                    sx={{
                      backgroundColor: `${api.color}20`,
                      color: api.color,
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    label={api.dataFormat.split(',')[0]}
                    size="small"
                    sx={{
                      backgroundColor: `${api.color}15`,
                      color: api.color,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Learning Tips Section */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SchoolIcon color="primary" />
        Learning Tips
      </Typography>

      <Grid container spacing={3}>
        {learningTips.map((tip, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.15)',
              }}
            >
              <CardContent sx={{ p: 3, display: 'flex', gap: 2 }}>
                <Typography variant="h3" sx={{ fontSize: '2.5rem' }}>
                  {tip.icon}
                </Typography>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {tip.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {apiTypes.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            API Types
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main' }}>
            15+
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Code Examples
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#4CAF50' }}>
            10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quiz Questions
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
