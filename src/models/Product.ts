
// src/models/Product.ts
import mongoose, { Schema, Document, models } from 'mongoose';

// Định nghĩa cấu trúc cho biến thể sản phẩm
const VariantSchema = new Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
});

// Định nghĩa cấu trúc cho hình ảnh sản phẩm
const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, default: '' },
});

// Giao diện TypeScript cho tài liệu Sản phẩm
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  images: { url: string; alt?: string }[];
  variants: { color: string; size: string; stock: number }[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Định nghĩa Schema chính của sản phẩm
const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: [true, "Tên sản phẩm là bắt buộc"], trim: true },
    description: { type: String, required: [true, "Mô tả là bắt buộc"], trim: true },
    price: { type: Number, required: [true, "Giá tiền là bắt buộc"], min: 0 },
    category: { type: String, required: [true, "Danh mục là bắt buộc"], trim: true },
    tags: [{ type: String, trim: true }],
    images: [ImageSchema],
    variants: [VariantSchema],
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: 'products' // Chỉ định tên collection rõ ràng
  }
);

// Xuất model
// Kiểm tra xem model đã tồn tại chưa trước khi tạo mới để tránh lỗi trong môi trường Next.js hot-reloading
const Product = models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
