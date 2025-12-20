
// seed.js
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// --- CẤU HÌNH ---
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';
const MONGO_URI = process.env.MONGODB_URI; 
// ---------------

// --- Cấu trúc Schema (sao chép từ model để script tự chứa) ---
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Vui lòng cung cấp email'],
    match: [/.+\@.+\..+/, 'Vui lòng nhập một địa chỉ email hợp lệ'],
  },
  password: {
    type: String,
    required: [true, 'Vui lòng cung cấp mật khẩu'],
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
    select: false, // Quan trọng: không trả về mật khẩu theo mặc định
  },
});

// Middleware để hash mật khẩu trước khi lưu (quan trọng!)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
// ---------------------------------------------------------


const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
   if (!MONGO_URI) {
    throw new Error('Vui lòng định nghĩa biến môi trường MONGODB_URI trong file .env.local');
  }
  return mongoose.connect(MONGO_URI);
};


const seedAdminUser = async () => {
  try {
    console.log('Kết nối đến cơ sở dữ liệu...');
    await dbConnect();
    console.log('Kết nối thành công!');

    // Lấy User model bao gồm cả trường password
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL }).select('+password');

    if (existingAdmin) {
      console.log(`- Người dùng quản trị với email ${ADMIN_EMAIL} đã tồn tại.`);
      
      // Xử lý lỗi type: Kiểm tra mật khẩu có tồn tại không
      if (!existingAdmin.password) {
        console.log('- Người dùng hiện tại không có mật khẩu. Cập nhật ngay...');
        existingAdmin.password = ADMIN_PASSWORD;
        await existingAdmin.save();
        console.log('✅ Đã cập nhật mật khẩu cho người dùng quản trị.');
      } else {
        const isMatch = await bcrypt.compare(ADMIN_PASSWORD, existingAdmin.password);
        if (!isMatch) {
          console.log('- Mật khẩu không khớp. Cập nhật mật khẩu...');
          existingAdmin.password = ADMIN_PASSWORD;
          await existingAdmin.save();
          console.log('✅ Đã cập nhật mật khẩu cho người dùng quản trị.');
        } else {
          console.log('- Mật khẩu đã được cập nhật.');
        }
      }
      return;
    }

    console.log(`- Tạo người dùng quản trị mới với email: ${ADMIN_EMAIL}`);
    
    const adminUser = new User({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    await adminUser.save();

    console.log('✅ Đã tạo người dùng quản trị thành công!');
    console.log('   Email:    ', ADMIN_EMAIL);
    console.log('   Mật khẩu: ', ADMIN_PASSWORD);

  } catch (error) {
    console.error('❌ Lỗi khi tạo hoặc cập nhật người dùng quản trị:', error);
    // In ra lỗi cụ thể nếu có
    if (error.message.includes('MONGODB_URI')) {
        console.error('💡 Gợi ý: Hãy chắc chắn rằng bạn đã tạo file .env.local và đặt biến MONGODB_URI trong đó.');
    }
  } finally {
    await mongoose.disconnect();
    console.log('Đã ngắt kết nối cơ sở dữ liệu.');
  }
};

seedAdminUser();
