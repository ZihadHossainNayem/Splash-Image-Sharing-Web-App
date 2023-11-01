import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: String,
    public_id: String,
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

/* if "user" model exists it uses existing model, 
otherwise creates a new model based on schema */
const UserModel = models.users || model("users", userSchema);

export default UserModel;
