import { useEffect, useState } from "react"


import LogoImg from "../assets/img/logo.svg"

import { Button } from "../components/Button"

import { RoomsRoom } from "../components/RoomsRoom"
import { useAuth } from "../hooks/useAuths"
import { database } from "../services/firebase"

import '../styles/room.scss'

type RoomType = {
  id: string,
  authorId: string,
  title: string
}

type FirebaseRooms = Record<string, {
  title: string,
  authorId: string
}>

export function Rooms() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<RoomType[]>([]);

  // if (!user) {
  //   throw new Error('You must be logged in')
  // }
  useEffect(() => {
    const roomsRef = database.ref('rooms');
    roomsRef.once('value', room => {
      const databaseRoom = room.val();
      const firebaseRooms: FirebaseRooms = databaseRoom ?? {};

      const parsedRooms = Object.entries(firebaseRooms).map(([key, value]) => {
        return {
          id: key,
          authorId: value.authorId,
          title: value.title
        }
      })
      setRooms(parsedRooms)

    })

    return () => {
      roomsRef.off('value');
    }

  })

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <Button>Criar Sala</Button>
        </div>
      </header>
      <main>
        <div className="rooms-list">
          {rooms.map(room => {
            return (
              <RoomsRoom
                key={room.id}
                id={room.id}
                title={room.title}
              >
              </RoomsRoom>)
          })
          }
        </div>

      </main>
    </div>
  )
}