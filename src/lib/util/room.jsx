import { getRoomInfoWithCode } from "~/store/reducers/room";
import { deleteRoom, deleteUserInRoom } from "~/lib/api/room";
import socket from "./socket";

const updateRoom = (code) => {
  const action = getRoomInfoWithCode({ roomCode: code });
  return action;
};

const exitRoom = async (isHost, roomId, userId = null) => {
  if (isHost) {
    // 방장이면 DB에서 room 삭제
    socket.emit("room_deleted", roomId);
    const deleteResp = await deleteRoom(roomId);
    console.log("delete Room", deleteResp);
  } else {
    // 아니면 본인만 나가기
    const deleteResp = await deleteUserInRoom(userId, roomId);
    console.log("delete user in room", deleteResp);
  }
};

export { updateRoom, exitRoom };
