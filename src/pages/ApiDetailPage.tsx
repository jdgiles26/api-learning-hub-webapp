import { useState } from 'react'
import { Typography, Box, Grid, Tabs, Tab, Chip, Divider, Paper, Button, Tooltip } from '@mui/material'
import CodeBlock from '../components/CodeBlock'
import FeatureCard from '../components/FeatureCard'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import type { ApiType } from '../types'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div hidden={value !== index} style={{ paddingTop: '24px' }}>
    {value === index && children}
  </div>
)

interface ApiDetailPageProps {
  apiType: ApiType
}

const ApiDetailPage = ({ apiType }: ApiDetailPageProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              color: apiType.color,
            }}
          >
            {apiType.name}
          </Typography>
          <Chip
            label={apiType.fullName}
            sx={{
              backgroundColor: `${apiType.color}20`,
              color: apiType.color,
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          />
        </Box>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          {apiType.description}
        </Typography>

        {/* Quick Info */}
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Data Format
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {apiType.dataFormat}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Transport
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {apiType.transport}
            </Typography>
          </Box>
          {apiType.httpMethod && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                HTTP Method
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {apiType.httpMethod}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            minHeight: '48px',
          },
          '& .Mui-selected': {
            color: `${apiType.color} !important`,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: apiType.color,
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Code Examples" />
        <Tab label="Architecture" />
        <Tab label="Comparison" />
      </Tabs>

      {/* Overview Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FeatureCard title="Key Features" items={apiType.features} type="features" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard title="Common Use Cases" items={apiType.useCases} type="useCases" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard title="Pros" items={apiType.pros} type="pros" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard title="Cons" items={apiType.cons} type="cons" />
          </Grid>
          <Grid item xs={12}>
            <FeatureCard title="When to Use" items={apiType.whenToUse} type="whenToUse" />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Code Examples Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Code Examples
          </Typography>
          
          {apiType.codeExamples.map((example, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                {example.title}
              </Typography>
              <CodeBlock
                code={example.code}
                language={example.language}
                title={example.title}
              />
              <Paper
                sx={{
                  p: 2,
                  mt: 1,
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <strong>💡 Explanation:</strong> {example.explanation}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </TabPanel>

      {/* Architecture Tab */}
      <TabPanel value={activeTab} index={2}>
        <ArchitectureDiagram steps={apiType.architecture} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Key Concepts
          </Typography>
          
          <Grid container spacing={2}>
            {apiType.features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: apiType.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2">{feature}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>

      {/* Comparison Tab */}
      <TabPanel value={activeTab} index={3}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          How {apiType.name} Compares
        </Typography>

        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
                ✅ Best For
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {apiType.whenToUse.map((item, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'warning.main' }}>
                ⚠️ Consider Alternatives When
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {apiType.cons.slice(0, 3).map((item, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            href="/compare"
            sx={{ textTransform: 'none' }}
          >
            See Full Comparison
          </Button>
        </Box>
      </TabPanel>
    </Box>
  )
}

export default ApiDetailPage
