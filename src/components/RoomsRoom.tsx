import { ReactNode } from "react"
import { Link } from "react-router-dom"

import "../styles/question.scss"
import "../styles/rooms.scss"

type RoomProps = {
  id: string,
  title: string;
  children?: ReactNode;
}

export function RoomsRoom({
  id,
  title,
  children,
}: RoomProps) {
  
  return (
    <div className="room">
      <Link to={`/rooms/${id}`} className="link" >
        <h1>
          {title}
        </h1>
        <footer>
          {/* <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div> */}
          <div>
            {children}
          </div>
        </footer>
      </Link>
    </div>


  )
}