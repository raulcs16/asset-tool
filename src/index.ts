import { initializeApp } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    const app = await initializeApp();
    app.listen(process.env.PORT || 3000, () =>
      console.log("🚀 Library API Live")
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
