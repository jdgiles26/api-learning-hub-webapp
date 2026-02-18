import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Alert,
  Chip,
  Fade,
  Paper,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { QuizQuestion } from '../types'

interface QuizComponentProps {
  questions: QuizQuestion[]
  title?: string
}

const QuizComponent = ({ questions, title = 'Test Your Knowledge' }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false))
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1))

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === question.correctAnswer
    if (isCorrect && !answered[currentQuestion]) {
      setScore(score + 1)
    }

    const newAnswered = [...answered]
    newAnswered[currentQuestion] = true
    setAnswered(newAnswered)

    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = selectedAnswer
    setUserAnswers(newUserAnswers)

    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(userAnswers[currentQuestion - 1])
      setShowResult(answered[currentQuestion - 1])
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswered(new Array(questions.length).fill(false))
    setUserAnswers(new Array(questions.length).fill(-1))
  }

  const isQuizComplete = answered.every(a => a)

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          {title}
        </Typography>

        {/* Progress */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Score: {score}/{questions.length}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'primary.main',
              },
            }}
          />
        </Box>

        {/* Question */}
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          {question.question}
        </Typography>

        {/* Options */}
        <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => !showResult && setSelectedAnswer(Number(e.target.value))}
          >
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showCorrectness = showResult && (isCorrect || isSelected)

              return (
                <Paper
                  key={index}
                  sx={{
                    mb: 1.5,
                    p: 1,
                    border: '2px solid',
                    borderColor: showResult
                      ? isCorrect
                        ? 'success.main'
                        : isSelected
                        ? 'error.main'
                        : 'rgba(255,255,255,0.1)'
                      : isSelected
                      ? 'primary.main'
                      : 'rgba(255,255,255,0.1)',
                    backgroundColor: showResult
                      ? isCorrect
                        ? 'rgba(76, 175, 80, 0.1)'
                        : isSelected
                        ? 'rgba(244, 67, 54, 0.1)'
                        : 'transparent'
                      : isSelected
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'transparent',
                    transition: 'all 0.2s ease',
                    cursor: showResult ? 'default' : 'pointer',
                    '&:hover': !showResult && {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    },
                  }}
                >
                  <FormControlLabel
                    value={index}
                    control={<Radio disabled={showResult} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option}
                        {showResult && isCorrect && (
                          <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <CancelIcon sx={{ color: 'error.main', fontSize: 20 }} />
                        )}
                      </Box>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Paper>
              )
            })}
          </RadioGroup>
        </FormControl>

        {/* Result */}
        <Fade in={showResult}>
          <Alert
            severity={selectedAnswer === question.correctAnswer ? 'success' : 'error'}
            sx={{ mb: 3 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
            </Typography>
            <Typography variant="body2">{question.explanation}</Typography>
          </Alert>
        </Fade>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          {!showResult ? (
            <Button
              variant="contained"
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
            >
              Check Answer
            </Button>
          ) : currentQuestion < questions.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next Question
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleRestart}>
              Restart Quiz
            </Button>
          )}
        </Box>

        {/* Final Score */}
        {isQuizComplete && (
          <Fade in>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Quiz Complete!
              </Typography>
              <Chip
                label={`Final Score: ${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%)`}
                color={score >= questions.length * 0.7 ? 'success' : score >= questions.length * 0.5 ? 'warning' : 'error'}
                sx={{ fontSize: '1.1rem', py: 2.5, px: 1 }}
              />
            </Box>
          </Fade>
        )}
      </CardContent>
    </Card>
  )
}

export default QuizComponent
