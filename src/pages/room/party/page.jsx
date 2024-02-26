import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RoomInfo from "~/components/roomInfo/roomInfo";

export default function RoomPartyPage() {
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);

  useEffect(() => {
    if (user && room) {
      console.log("user: ", user);
      console.log("room:", room);
    } else {
      if (!user) console.error("user is null");
      if (!room) console.error("room is null");
    }
  }, [room, user]);
  return <RoomInfo />;
}
