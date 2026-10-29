const TOKEN_KEY = "user_token";

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  // Remove the legacy key used by the development-only route bypass.
  localStorage.removeItem("token");
  localStorage.removeItem("dev_bypass");
};
