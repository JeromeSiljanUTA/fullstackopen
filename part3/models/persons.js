import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGODB_URI;

const phonebookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("entry", phonebookSchema);

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((status) => {
    console.log("successful connection");
  })
  .catch((err) => {
    console.log(`connection error: ${err}`);
  });

export { Person };
