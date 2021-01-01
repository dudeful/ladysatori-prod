<<<<<<< HEAD
import React from "react";
import Countdown from "../Countdown";

const DashboardCourse = () => {
  return (
    <div>
      <Countdown endTime={Date.UTC(2021, 0, 10, 12, 0, 0, 0)} />
=======
const DashboardCourse = () => {
  const hello = [];
  for (let i = 0; i < 500; i++) {
    hello.push("hello friend");
  }

  return (
    <div className="row">
      {hello.map((hello) => {
        return (
          <p className="col" key={Math.random() + Math.random()}>
            {hello}
          </p>
        );
      })}
>>>>>>> 8223c65bbbd24b35cd7b74bf1cc9582da22a1a73
    </div>
  );
};

export default DashboardCourse;
