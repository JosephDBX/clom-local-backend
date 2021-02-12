import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const UserSchema = new Schema({
    name: { type: String, required: true }
});

UserSchema.plugin(mongoosePaginate);

export default model('User', UserSchema);