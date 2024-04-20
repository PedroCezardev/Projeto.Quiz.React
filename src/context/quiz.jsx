// contruindo arquivo context: para abstrair a lógica dos componentes e deixar o codigo mais limpo  ;
// Atruibuimos 1 arquivo ou mais para adicionar a lógica da aplicação 
// e apartir de algumas ações que adionamos no context, mudamos o estado da aplicação;
// Adicionamos o arquivo em letras minúsculas para diferenciar do componente.

// usando o Reducer conseguimos gerenciar estados mais complexos com mais facilidade
import { createContext, useReducer } from 'react'
import question from '../data/questions'

// determinando os estagios do jogo
const STAGES = ["Start", "Playing", "End"]

// inicializando estados
const initialState = {
    gameStage: STAGES[0],
    question,
    currentQuestion: 0,
    answerSelected: false,
    score: 0,
    
}

// alterando o estado da aplicação
const QuizReducer = (state, action) => {

    switch (action.type) {
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
            };

        case "REORDER_QUESTIONS":
            // reordenar as peguntas
            const reorderedQuestions = question.sort(() => {
                return Math.random() - 0.5;
            });

            return {
                ...state,
                question: reorderedQuestions,
            };

        case "CHANGE_QUESTION":
            // seguir para proxima pergunta
            const nextQuestion = state.currentQuestion + 1;

            let endGame = false;
            // verificando se chegou no fim das peguntas
            if (!question[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[2] : state.gameStage,
                answerSelected: false,
            }

        case "NEW_GAME":
            return initialState;
        // reiniciando o jogo       
        // voltando para o estado inicial    

        case "CHECK_ANSWER": {
            // validando a resposta do usuário
            if (state.answerSelected) return state;
      
            const answer = action.payload.answer;
            const option = action.payload.option;
            let correctAnswer = 0;
      
            if (answer === option) correctAnswer = 1;
      
            return {
              ...state,
              score: state.score + correctAnswer,
              answerSelected: option,
            };
          }

        default:
            return state;
    }

}

// criando e exportando o arquivo context
export const QuizContext = createContext()

// criando um arquivo provider para habilitar o arquivo context
// para fazer isso podemos escolher componetes especificos ou toda a aplicação
// nesse caso estamos fazendo para toda aplicação, para todos componentes conseguirem chegar no contexto
// importante ressaltar que o provider é onde provem o contexto, e o context é onde consome

// utilizando children conseguimos encapsular componentes dentro de outro componente
export const QuizProvider = ({ children }) => {
    const value = useReducer(QuizReducer, initialState);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
};

