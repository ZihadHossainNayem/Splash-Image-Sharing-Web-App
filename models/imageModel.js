import { Schema, model, models } from "mongoose";

const imageSchema = new Schema(
  {
    title: String,
    slug: String,
    public_id: String,
    imgUrl: String,
    imgName: String,
    blurHash: String,
    tags: [],
    /* image is public or private */
    public: {
      type: Boolean,
      default: false,
    },
    /* single reference relationship */
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    /* multi reference relationship */
    favorite_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

/* if "image" model exists it uses existing model, 
otherwise creates a new model based on schema */
const ImageModel = models.images || model("images", imageSchema);

export default ImageModel;
