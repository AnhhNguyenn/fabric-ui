
// src/models/Category.ts
import { Schema, model, models, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Tên danh mục là bắt buộc.'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

const Category = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
