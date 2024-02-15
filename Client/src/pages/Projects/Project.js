import React from "react";
import ProjectForm from "../../components/ProjectForm";
import AppLayout from "../AppLayout";
export default function Project() {
  return (
    <AppLayout>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8 center-screen">
          <ProjectForm />
        </div>
      </div>
    </AppLayout>
  );
}
