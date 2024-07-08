import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  facebookId: String,
  username: String,
  email: String,
  profilePicUrl: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
