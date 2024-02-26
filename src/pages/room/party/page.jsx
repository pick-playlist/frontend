import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RoomInfo from "~/components/roomInfo/roomInfo";

export default function RoomPartyPage() {
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);

  return <RoomInfo />;
}
