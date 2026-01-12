export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true, // Prevents JS from reading the cookie (XSS protection)
  secure: true, // Only send over HTTPS in production
  sameSite: "lax", // Prevents CSRF
  maxAge: 15 * 60 * 1000, //15 min
};

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true, // Prevents JS from reading the cookie (XSS protection)
  secure: true, // Only send over HTTPS in production
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
