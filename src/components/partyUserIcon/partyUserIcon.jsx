import React from "react";

export default function PartyUserIcon({ userNickName, color }) {
  console.log("userNickname: ", userNickName);
  return (
    <div
      class="partyUserIcon"
      style={{
        zIndex: 2,
        backgroundColor: color,
      }}
    >
      {userNickName[0] ? userNickName[0] : "u"}
    </div>
  );
}
