import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: number;
  password: string;
  bio?: string;
  picture: string;
  location?: string | undefined; // Adjusted type here
  portfolioWebsite?: string;
  reputation: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  picture: { type: String, required: true },
  location: { type: String }, // This line can also be { type: String | undefined }
  portfolioWebsite: { type: String },
  reputation: { type: Number },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
