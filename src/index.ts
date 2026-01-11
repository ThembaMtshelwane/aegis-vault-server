import app from "./app.js"; // Import the default export
import ENV_VARS from "./consts/env.consts.js";

// Only run app.listen locally
if (process.env.NODE_ENV !== "production") {
  app.listen(ENV_VARS.PORT, () => {
    console.log(`🚀 Local Server running at http://localhost:${ENV_VARS.PORT}`);
  });
}
