import { USER_SERVICE_URL } from "../config/serviceUrls";

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${USER_SERVICE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const registerUser = async ({
  name,
  email,
  password,
  registerNumber,
  dateOfBirth,
  department,
}) => {
  const response = await fetch(`${USER_SERVICE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      registerNumber,
      dateOfBirth,
      department,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};
