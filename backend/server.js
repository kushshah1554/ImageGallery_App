require("dotenv").config();
const express = require("express");
const connectToDataBase=require("./database/db");
const authRoutes=require("./routes/auth-routes");
const imageRoutes=require("./routes/image-routes");
const port = process.env.PORT;
const cors=require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/user",authRoutes);
app.use("/api/image",imageRoutes);

//connect to database
connectToDataBase();

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
