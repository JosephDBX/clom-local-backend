import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const AreaSchema = new Schema({
    name: { type: String, required: true }
});

AreaSchema.plugin(mongoosePaginate);

exports.Area = model("Area", AreaSchema);