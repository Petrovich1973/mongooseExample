import mongoose from "mongoose";
import mongooseHidden from "meanie-mongoose-to-json";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	id    : { type: String, required: true },
    name  : { type: String, required: true },
    age   : { type: String },
    gender: { type: String }
});

UserSchema.plugin(mongooseHidden);

mongoose.model('User', UserSchema);