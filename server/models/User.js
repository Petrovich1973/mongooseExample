import mongoose from "mongoose";
import mongooseHidden from "meanie-mongoose-to-json";
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	id    : { type: String, required: true },
    name  : { type: String, required: true },
    age   : { type: String },
    gender: { type: String }
});

UserSchema
	.plugin(mongooseHidden)
	.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);