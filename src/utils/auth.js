export async function verifyTokens() {
  const raw = localStorage.getItem("tokens");
  if (!raw) return false;

  try {
    const { access_token, refresh_token, userId, user_name } = JSON.parse(raw);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token: access_token,
        refresh_token: refresh_token
      })
    });
    if (res.ok) {
      const data = await res.json();
      // access_token 갱신되었으면 저장

      if (data.access_token) {
        localStorage.setItem("tokens", JSON.stringify({
          access_token: data.access_token,
          refresh_token,
          userId,
          user_name
        }));
      }
      return true;
    } else {
      localStorage.removeItem("tokens");
      return false;
    }
  } catch (err) {
    localStorage.removeItem("tokens");
    return false;
  }
}