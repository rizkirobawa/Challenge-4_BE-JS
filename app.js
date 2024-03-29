const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const v1 = require("./routes/v1");
app.use("/v1", v1);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
