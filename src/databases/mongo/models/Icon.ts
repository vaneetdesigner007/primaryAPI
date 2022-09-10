import { model, Schema } from "mongoose";

export interface IntIcons {
  bundleName: string;
  iconName: string;
  tags: string;
  iconPng: Object;
  iconSvg: Object;
  iconType: string;
}

const IconsSchema = new Schema<IntIcons>(
  {
    bundleName: { type: String, default: "" },
    iconName: { type: String, required: true },
    tags: { type: String, required: true },
    iconPng: { type: Object, required: true },
    iconSvg: { type: Object, required: true },
    iconType: { type: String, required: true },
  },
  { collection: "Icon", timestamps: true }
);

export default model<IntIcons>("Icon", IconsSchema);
