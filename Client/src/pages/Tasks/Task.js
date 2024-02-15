import React from "react";
import TaskForm from "../../components/TaskForm";
import AppLayout from "../AppLayout";

export default function Task() {
  return (
    <AppLayout>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8 center-screen">
          <TaskForm />
        </div>
      </div>
    </AppLayout>
  );
}
