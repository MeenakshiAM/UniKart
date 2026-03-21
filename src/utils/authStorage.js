export const saveAuthSession = ({ token, user }) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("userName", user?.name || "User");
  localStorage.setItem("userType", user?.role || "BUYER");
};

export const clearAuthSession = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userType");
};

export const getAuthToken = () => localStorage.getItem("authToken") || "";

export const isAuthenticated = () => !!getAuthToken();
