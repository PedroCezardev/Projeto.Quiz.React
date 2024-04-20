import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QuizProvider } from './context/quiz.jsx'
// impotando o provider para prover o contexto para a aplicação

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>,
)
