import app from "./app.js";
import cors from "cors";
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
