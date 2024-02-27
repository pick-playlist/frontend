import React from "react";

export default function PartyUserIcon({ user, color, index }) {
  return (
    <div
      className="partyUserIcon"
      style={{
        width: "30px",
        height: "30px",
        zIndex: 2,
        backgroundColor: color,
        position: index !== 0 ? "absolute" : "relative",
        top: 0,
        left: `${index * 30}px`,
      }}
    >
      {user && user.profilePhoto ? (
        <img
          src={user.profilePhoto}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        />
      ) : user ? (
        user.nickname[0]
      ) : (
        "u"
      )}
    </div>
  );
}
