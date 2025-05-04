import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IDataImage extends Document {
  linkId: string;
  imageBase64: string;
  createdAt: Date;
}

const DataImageSchema: Schema<IDataImage> = new Schema(
  {
    linkId: {
      type: String,
      required: true,
      index: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default models.DataImage ||
  model<IDataImage>("DataImage", DataImageSchema);
