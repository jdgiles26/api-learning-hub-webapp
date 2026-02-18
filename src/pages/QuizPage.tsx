import { Typography, Box } from '@mui/material'
import QuizComponent from '../components/QuizComponent'
import { quizQuestions } from '../data/apiContent'

const QuizPage = () => {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
        Knowledge Check
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        Test your understanding of API protocols with {quizQuestions.length} questions 
        covering REST, GraphQL, WebSocket, gRPC, and SOAP.
      </Typography>

      <QuizComponent questions={quizQuestions} />
    </Box>
  )
}

export default QuizPage
