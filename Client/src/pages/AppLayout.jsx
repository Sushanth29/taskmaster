import React from "react";
import Dashboard from "./Dashboard";

export default function AppLayout(props) {
  return (
    <div
      className="w-full row justify-content-center align-items-start"
      style={{ width: "100%" }}
    >
      <div>
        <Dashboard />
      </div>
      <div className="mt-2">{props.children}</div>
    </div>
  );
}
