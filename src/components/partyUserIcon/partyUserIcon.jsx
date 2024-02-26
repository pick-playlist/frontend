import React from "react";

export default function PartyUserIcon({ userNickName, color }) {
  return (
    <div
      class="partyUserIcon"
      style={{
        zIndex: 2,
        backgroundColor: color,
      }}
    >
      {userNickName[0]}
    </div>
  );
}
