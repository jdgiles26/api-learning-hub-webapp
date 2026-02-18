import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import ApiDetailPage from './pages/ApiDetailPage'
import ComparisonPage from './pages/ComparisonPage'
import QuizPage from './pages/QuizPage'
import { apiTypes } from './data/apiContent'

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8, // Space for fixed navbar
          pb: 4,
          px: { xs: 2, sm: 3, md: 4 },
          ml: { md: '260px' }, // Space for sidebar on desktop
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          {apiTypes.map((api) => (
            <Route
              key={api.id}
              path={`/${api.id}`}
              element={<ApiDetailPage apiType={api} />}
            />
          ))}
        </Routes>
      </Box>
    </Box>
  )
}

export default App
