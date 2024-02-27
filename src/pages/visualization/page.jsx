import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ButtonInPages } from "~/components/styled/globalComponent";

export default function Visualization() {
  const user = useSelector((state) => state.user.data);
  const room = useSelector((state) => state.room.data);

  // const tags = room.tags;
  const tags = ["비비", "비비", "어쩌구", "저쩌구", "빅뱅", "아이유", "IU"];

  const countTags = async (tags) => {
    let counts = {};

    tags.forEach((ele) => {
      if (counts[ele] === undefined) {
        counts[ele] = 1;
      } else {
        counts[ele]++;
      }
    });

    return counts;
  };

  useEffect(async () => {
    const counts = await countTags(tags);
    console.log("count", counts);

    //워드 클라우드 생성
    //
  }, []);

  const clickGoMainButton = () => {
    // 리둑스에서 user 삭제
    const action = setIsLoggedInFalse();
    dispatch(action);

    // 리둑스에서 room 삭제
    //

    // 메인으로 이동
    navigate("/");
  };

  return (
    <div style={{ alignSelf: "start" }}>
      <h2 style={{ fontFamily: "IBMPlexSansKR-Regular" }}>제안된 음악 태그</h2>
      <div>{/* word cloud */}</div>

      <ButtonInPages
        onClick={() => {
          clickGoMainButton();
        }}
        className="mt-5"
      >
        메인으로
      </ButtonInPages>
    </div>
  );
}
