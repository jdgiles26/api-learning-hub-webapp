import { Box, Typography, Paper } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface ArchitectureStep {
  step: number
  title: string
  description: string
}

interface ArchitectureDiagramProps {
  steps: ArchitectureStep[]
  title?: string
}

const ArchitectureDiagram = ({ steps, title = 'How It Works' }: ArchitectureDiagramProps) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', md: 'center' },
          overflowX: { md: 'auto' },
          pb: 2,
        }}
      >
        {steps.map((step, index) => (
          <Box key={step.step} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Paper
              sx={{
                p: 2,
                minWidth: { xs: '100%', md: '200px' },
                flex: 1,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: { md: 'scale(1.05)' },
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: 12,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                }}
              >
                Step {step.step}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5, fontWeight: 600 }}>
                {step.title}
              </Typography>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4 }}>
                {step.description}
              </Typography>
            </Paper>

            {index < steps.length - 1 && (
              <ArrowForwardIcon
                sx={{
                  color: 'primary.main',
                  display: { xs: 'none', md: 'block' },
                  flexShrink: 0,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ArchitectureDiagram
