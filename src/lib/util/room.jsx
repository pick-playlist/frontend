import { getRoomInfoWithCode } from "~/store/reducers/room";

const updateRoom = (code) => {
  const action = getRoomInfoWithCode({ roomCode: code });
  return action;
};

export { updateRoom };
