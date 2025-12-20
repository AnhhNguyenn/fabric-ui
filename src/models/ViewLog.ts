
// src/models/ViewLog.ts
import { Schema, model, models, Document } from 'mongoose';

export interface IViewLog extends Document {
  type: 'product' | 'page';
  identifier: string; // Product ID or Page URL
  createdAt: Date;
}

const ViewLogSchema = new Schema<IViewLog>({
  type: {
    type: String,
    enum: ['product', 'page'],
    required: true,
  },
  identifier: {
    type: String,
    required: true,
    index: true, // Index để tăng tốc độ truy vấn
  },
}, {
  timestamps: { createdAt: true, updatedAt: false }, // Chỉ sử dụng createdAt làm mốc thời gian
});

// Đặt một chỉ mục TTL (Time-To-Live) để tự động xóa các bản ghi cũ sau 90 ngày
// Giúp cho collection không bị phình to một cách không cần thiết
ViewLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 24 * 90 });

const ViewLog = models.ViewLog || model<IViewLog>('ViewLog', ViewLogSchema);

export default ViewLog;
