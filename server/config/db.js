import mongoose from "mongoose";

export default mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => console.log("FAILED TO CONNECT"));
