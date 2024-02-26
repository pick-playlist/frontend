import { useDispatch } from "react-redux";
import { getRoomInfoWithCode } from "~/store/reducers/room";

const updateRoom = (code, dispatch) => {
  const action = getRoomInfoWithCode({ roomCode: code });
  dispatch(action);
};

export { updateRoom };
