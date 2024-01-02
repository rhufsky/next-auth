export async function getFortuneClient() {
  const response = await fetch("/api/fortune");

  switch (response.status) {
    case 200:
      const cookie = await response.json();
      return cookie.fortune;
    case 401:
      return "unauthorized";
    default:
      return "Server error";
  }
}
