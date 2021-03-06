import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const AreaSchema = new Schema({
    name: { type: String, required: true }
});

AreaSchema.plugin(mongoosePaginate);

export default model('Area', AreaSchema);