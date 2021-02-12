import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const RoleSchema = new Schema({
    name: { type: String, required: true }
});

RoleSchema.plugin(mongoosePaginate);

export default model('Role', RoleSchema);