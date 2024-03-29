import React from "react";
import { useEffect } from "react";
import socket from "~/lib/util/socket";
import { getLinkInfo } from "~/lib/api/search";

export default function page() {
  // room_updated 이벤트 수신 시
  useEffect(() => {
    socket.on("room_updated", (data) => {
      console.log("updated, data: ", data);
    });
  }, []);

  const clickBtn = () => {
    console.log("click");
    socket.emit("room_updated", "roomIdTest");
  };

  const resp = getLinkInfo(
    "https://www.youtube.com/watch?v=MAhi-BPFjMc&list=RDMAhi-BPFjMc&start_radio=1"
  ).then((resp) => {
    console.log(resp);
  });

  return (
    <div>
      <p>test page</p>
      <button onClick={() => clickBtn()}>test</button>
    </div>
  );
}
