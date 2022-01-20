import { useNavigate, useParams } from "react-router-dom"

import LogoImg from "../assets/img/logo.svg"
import deleteImg from "../assets/img/delete.svg"
import checkImg from "../assets/img/check.svg"
import answerImg from "../assets/img/answer.svg"

import { Button } from "../components/Button"
import { Questions } from "../components/Questions"
import { RoomCode } from "../components/RoomCode"
import { useAuth } from "../hooks/useAuths"
import { useRoom } from "../hooks/useRoom"

import '../styles/room.scss'
import { database } from "../services/firebase"

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const history = useNavigate();

  const roomId = params.id;

  const { title, questions } = useRoom(roomId || '')

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir essa perguta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }

  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string, isHighLighted: boolean) {
    if (!isHighLighted) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighLighted: true,
      })
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighLighted: false,
      })
    }

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId || ''} />
            <Button
              isOutlined
              onClick={handleEndRoom}
            >Encerrar Sala</Button>
          </div>

        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Questions
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => { handleCheckQuestionAsAnswered(question.id) }}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => { handleHighlightQuestion(question.id, question.isHighLighted) }}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>

                )}
                <button
                  type="button"
                  onClick={() => { handleDeleteQuestion(question.id) }}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Questions>
            )
          })}
        </div>
      </main>
    </div>
  )
}