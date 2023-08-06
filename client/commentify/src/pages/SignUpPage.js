import React from "react";
import SignupForm from "../components/SignupForm/SignupForm";

import { json, redirect } from "react-router-dom";

function SignUp(props) {
  return <SignupForm />;
}

export default SignUp;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    firstName: data.get("firstname"),
    lastName: data.get("lastName"),
  };

  const response = await fetch(process.env.REACT_APP_BASE_URL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
