require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.POR || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
