import React from "react";
import TeamRoasterForm from "../../components/TeamRoasterForm";
import AppLayout from "../AppLayout";

export default function TeamRoaster() {
  return (
    <AppLayout>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8 center-screen">
          <TeamRoasterForm />
        </div>
      </div>
    </AppLayout>
  );
}
