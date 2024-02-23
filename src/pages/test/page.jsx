import React from "react";
import { postMusic, getMusicInfo, putVote } from "~/lib/api/music";
import { useState, useEffect } from "react";

export default function page() {
  const [result, setResult] = useState("");

  useEffect(() => {
    putVote("65d80680b329663c00715622", true).then((resp) => {
      setResult(resp);
      console.log("resp: ", resp);
    });
  }, []);

  return (
    <div>
      <p>test page</p>
    </div>
  );
}
