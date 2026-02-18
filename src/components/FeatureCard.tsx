import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

interface FeatureCardProps {
  title: string
  items: string[]
  type?: 'pros' | 'cons' | 'features' | 'useCases' | 'whenToUse'
  icon?: React.ReactNode
}

const FeatureCard = ({ title, items, type = 'features', icon }: FeatureCardProps) => {
  const getColors = () => {
    switch (type) {
      case 'pros':
        return {
          border: 'rgba(76, 175, 80, 0.3)',
          bg: 'rgba(76, 175, 80, 0.08)',
          icon: <CheckCircleIcon sx={{ color: '#4CAF50' }} />,
        }
      case 'cons':
        return {
          border: 'rgba(244, 67, 54, 0.3)',
          bg: 'rgba(244, 67, 54, 0.08)',
          icon: <ErrorIcon sx={{ color: '#f44336' }} />,
        }
      case 'useCases':
        return {
          border: 'rgba(33, 150, 243, 0.3)',
          bg: 'rgba(33, 150, 243, 0.08)',
          icon: icon || <HelpOutlineIcon sx={{ color: '#2196F3' }} />,
        }
      case 'whenToUse':
        return {
          border: 'rgba(156, 39, 176, 0.3)',
          bg: 'rgba(156, 39, 176, 0.08)',
          icon: icon || <HelpOutlineIcon sx={{ color: '#9c27b0' }} />,
        }
      default:
        return {
          border: 'rgba(99, 102, 241, 0.3)',
          bg: 'rgba(99, 102, 241, 0.08)',
          icon: icon || <HelpOutlineIcon sx={{ color: '#6366f1' }} />,
        }
    }
  }

  const colors = getColors()

  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px -8px ${colors.border}`,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {colors.icon}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {items.map((item, index) => (
            <Typography
              key={index}
              component="li"
              variant="body2"
              sx={{
                mb: 1,
                color: 'text.secondary',
                lineHeight: 1.6,
                '&::marker': {
                  color: type === 'pros' ? '#4CAF50' : type === 'cons' ? '#f44336' : 'primary.main',
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default FeatureCard
