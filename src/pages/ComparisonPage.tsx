import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Tooltip } from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { comparisonData } from '../data/apiContent'

const ComparisonPage = () => {
  const getApiColor = (api: string) => {
    const colors: Record<string, string> = {
      'rest': '#4CAF50',
      'graphql': '#E535AB',
      'websocket': '#FF9800',
      'grpc': '#2196F3',
      'soap': '#795548'
    }
    return colors[api.toLowerCase()] || '#6366f1'
  }

  const formatCell = (value: string) => {
    if (value.includes('✅')) {
      return <span style={{ color: '#4CAF50' }}>{value}</span>
    }
    if (value.includes('❌')) {
      return <span style={{ color: '#f44336' }}>{value}</span>
    }
    if (value.includes('⚠️')) {
      return <span style={{ color: '#FF9800' }}>{value}</span>
    }
    return value
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
        <CompareArrowsIcon fontSize="large" color="primary" />
        API Comparison
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
        Compare all API protocols side by side. This comprehensive comparison helps you choose 
        the right API style for your specific use case based on technical characteristics.
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'background.paper',
          border: '1px solid rgba(255,255,255,0.1)',
          overflowX: 'auto',
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  fontWeight: 700,
                  borderBottom: '2px solid rgba(99, 102, 241, 0.3)',
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                }}
              >
                Feature
              </TableCell>
              {['REST', 'GraphQL', 'WebSocket', 'gRPC', 'SOAP'].map((api) => (
                <TableCell
                  key={api}
                  align="center"
                  sx={{
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fontWeight: 700,
                    borderBottom: '2px solid rgba(99, 102, 241, 0.3)',
                    color: getApiColor(api),
                    minWidth: 120,
                  }}
                >
                  {api}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {comparisonData.map((row, index) => (
              <TableRow
                key={row.feature}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'rgba(255,255,255,0.02)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: 600,
                    position: 'sticky',
                    left: 0,
                    backgroundColor: index % 2 === 0 ? 'background.paper' : 'rgba(255,255,255,0.02)',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {row.feature}
                </TableCell>
                <TableCell align="center">{formatCell(row.rest)}</TableCell>
                <TableCell align="center">{formatCell(row.graphql)}</TableCell>
                <TableCell align="center">{formatCell(row.websocket)}</TableCell>
                <TableCell align="center">{formatCell(row.grpc)}</TableCell>
                <TableCell align="center">{formatCell(row.soap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Legend */}
      <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip size="small" sx={{ backgroundColor: '#4CAF5030', color: '#4CAF50' }} label="✅ Yes/Good" />
          <Typography variant="caption" color="text.secondary">Fully supported / Recommended</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip size="small" sx={{ backgroundColor: '#FF980030', color: '#FF9800' }} label="⚠️ Limited" />
          <Typography variant="caption" color="text.secondary">Partially supported / Complex</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip size="small" sx={{ backgroundColor: '#f4433630', color: '#f44336' }} label="❌ No" />
          <Typography variant="caption" color="text.secondary">Not supported / Not recommended</Typography>
        </Box>
      </Box>

      {/* Quick Recommendations */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Quick Recommendations
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Paper sx={{ p: 3, flex: '1 1 300px', border: '1px solid rgba(76, 175, 80, 0.3)', backgroundColor: 'rgba(76, 175, 80, 0.05)' }}>
            <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1 }}>
              🌐 Start with REST
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Best for beginners. Simple, widely supported, and perfect for CRUD operations.
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: '1 1 300px', border: '1px solid rgba(229, 53, 171, 0.3)', backgroundColor: 'rgba(229, 53, 171, 0.05)' }}>
            <Typography variant="h6" sx={{ color: '#E535AB', mb: 1 }}>
              🌲 Complex Data? Use GraphQL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              When clients need flexible queries and you want to avoid multiple round trips.
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: '1 1 300px', border: '1px solid rgba(255, 152, 0, 0.3)', backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>
            <Typography variant="h6" sx={{ color: '#FF9800', mb: 1 }}>
              ⚡ Real-time? Choose WebSocket
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For chat, live updates, and bidirectional communication needs.
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: '1 1 300px', border: '1px solid rgba(33, 150, 243, 0.3)', backgroundColor: 'rgba(33, 150, 243, 0.05)' }}>
            <Typography variant="h6" sx={{ color: '#2196F3', mb: 1 }}>
              🔌 Microservices? Try gRPC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              High-performance internal service communication with strict contracts.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default ComparisonPage
