"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/seed.ts
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Thay đổi đường dẫn thành tương đối
const dbConnect_1 = __importDefault(require("../lib/dbConnect"));
const User_1 = __importDefault(require("../models/User"));
// --- CẤU HÌNH ---
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';
// --------------- 
const seedAdminUser = async () => {
    try {
        console.log('Kết nối đến cơ sở dữ liệu...');
        await (0, dbConnect_1.default)();
        console.log('Kết nối thành công!');
        // 1. Kiểm tra xem admin user đã tồn tại chưa
        const existingAdmin = await User_1.default.findOne({ email: ADMIN_EMAIL });
        if (existingAdmin) {
            console.log(`- Người dùng quản trị với email ${ADMIN_EMAIL} đã tồn tại.`);
            // Nếu đã tồn tại, cập nhật mật khẩu nếu cần
            const isMatch = await bcryptjs_1.default.compare(ADMIN_PASSWORD, existingAdmin.password);
            if (!isMatch) {
                console.log('- Mật khẩu không khớp. Cập nhật mật khẩu...');
                existingAdmin.password = ADMIN_PASSWORD; // Middleware sẽ hash lại
                await existingAdmin.save();
                console.log('✅ Đã cập nhật mật khẩu cho người dùng quản trị.');
            }
            else {
                console.log('- Mật khẩu đã được cập nhật.');
            }
            return;
        }
        console.log(`- Tạo người dùng quản trị mới với email: ${ADMIN_EMAIL}`);
        // 2. Tạo người dùng mới
        const adminUser = new User_1.default({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        });
        // 3. Lưu vào cơ sở dữ liệu
        await adminUser.save();
        console.log('✅ Đã tạo người dùng quản trị thành công!');
        console.log('   Email: ', ADMIN_EMAIL);
        console.log('   Mật khẩu: ', ADMIN_PASSWORD);
    }
    catch (error) {
        console.error('❌ Lỗi khi tạo hoặc cập nhật người dùng quản trị:', error);
    }
    finally {
        // 4. Đóng kết nối
        await mongoose_1.default.disconnect();
        console.log('Đã ngắt kết nối cơ sở dữ liệu.');
    }
};
// Chạy hàm seed
seedAdminUser();
