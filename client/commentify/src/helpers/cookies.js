export function setCookie(name, value) {
  const expirationDate = new Date(Date.now() + 30000);
  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; `;
  document.cookie = cookieString;
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

export const tokensHandler = (response, requestHandler) => {
  if (response.data.status === "REFRESH") {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return {
        status: "NO TOKEN",
        message: "Token is missing, user must login again",
      };
    }

    setCookie("refreshToken", refreshToken);
    return requestHandler();
  } else {
    return response.data;
  }
};
