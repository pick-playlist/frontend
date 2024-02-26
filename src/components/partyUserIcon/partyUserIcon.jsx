import React from "react";

export default function PartyUserIcon({ userNickName, color, index }) {
  return (
    <div
      class="partyUserIcon"
      style={{
        zIndex: 2,
        backgroundColor: color,
        position: index !== 0 ? "absolute" : "relative",
        top: 0,
        left: `${index * 30}px`,
      }}
    >
      {userNickName ? userNickName[0] : ""}
    </div>
  );
}
