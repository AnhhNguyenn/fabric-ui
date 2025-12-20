
// models/User.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface đại diện cho một tài liệu User (bao gồm các phương thức của Mongoose)
export interface IUser extends Document {
  email: string;
  password?: string; // Mật khẩu là tùy chọn khi lấy dữ liệu ra
  createdAt: Date;
  updatedAt: Date;
}

// Schema của User
const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Vui lòng nhập địa chỉ email hợp lệ'],
    },
    password: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
      minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
      select: false, // Mặc định không trả về trường password khi query
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Middleware: Tự động mã hóa mật khẩu trước khi lưu
UserSchema.pre<IUser>('save', async function (next) {
  // Chỉ mã hóa nếu mật khẩu đã được thay đổi (hoặc là người dùng mới)
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error: any) {
    return next(error);
  }
});

// Phương thức để so sánh mật khẩu đã nhập với mật khẩu đã mã hóa
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

// Tránh ghi đè model nếu nó đã được biên dịch
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
