export function isAuthenticated() {
    const token = localStorage.getItem("tokens");
    return !!token; // 토큰이 있으면 true
  }

