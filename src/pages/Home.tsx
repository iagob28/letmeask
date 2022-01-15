import { useNavigate } from "react-router-dom"

import { useContext } from "react"

import illustrationImg from "../assets/img/illustration.svg"
import logoImg from "../assets/img/logo.svg"
import googleIconImg from "../assets/img/google-icon.svg"

import "../styles/auth.scss"
import { Button } from "../components/Button"
import { AuthContext } from "../App"


export function Home() {
  const history = useNavigate();
  const { user, signInWithGoogle} = useContext(AuthContext);

  async function handleCreateRoom() {
    if (!user){
      await signInWithGoogle()
    }
    history('/rooms/new');
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}