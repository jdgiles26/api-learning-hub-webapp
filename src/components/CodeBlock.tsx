import { useState } from 'react'
import { Box, IconButton, Typography, Tooltip, Fade } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  showLineNumbers?: boolean
}

const CodeBlock = ({ code, language, title, showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Map common language names to prism identifiers
  const languageMap: Record<string, string> = {
    'javascript': 'javascript',
    'typescript': 'typescript',
    'python': 'python',
    'java': 'java',
    'go': 'go',
    'rust': 'rust',
    'protobuf': 'protobuf',
    'graphql': 'graphql',
    'xml': 'xml',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'yaml': 'yaml',
    'bash': 'bash',
    'shell': 'bash',
    'sql': 'sql',
  }

  const prismLanguage = languageMap[language.toLowerCase()] || 'javascript'

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#1e1e1e',
        border: '1px solid rgba(255,255,255,0.1)',
        my: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </Box>
          {title && (
            <Typography
              variant="caption"
              sx={{
                ml: 2,
                color: 'text.secondary',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 500,
              }}
            >
              {title}
            </Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              letterSpacing: 1,
            }}
          >
            {language}
          </Typography>
          <Tooltip title={copied ? 'Copied!' : 'Copy code'} arrow>
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={{
                color: copied ? 'success.main' : 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <Fade in={!copied}>
                <ContentCopyIcon fontSize="small" />
              </Fade>
              <Fade in={copied}>
                <CheckIcon fontSize="small" sx={{ position: 'absolute' }} />
              </Fade>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Code */}
      <Box
        sx={{
          '& pre': {
            margin: 0,
            borderRadius: 0,
            fontSize: '0.875rem',
            lineHeight: 1.6,
          },
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#475569',
            borderRadius: '4px',
          },
        }}
      >
        <SyntaxHighlighter
          language={prismLanguage}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            backgroundColor: '#1e1e1e',
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#6e7681',
            fontSize: '0.75rem',
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </Box>
    </Box>
  )
}

export default CodeBlock
