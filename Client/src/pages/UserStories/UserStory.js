import React from "react";
import UserStoryForm from "../../components/UserStoryForm";
import AppLayout from "../AppLayout";

export default function UserStory() {
  return (
    <AppLayout>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-7 center-screen">
            <UserStoryForm />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
