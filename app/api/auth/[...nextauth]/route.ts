
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Vui lòng nhập email và mật khẩu.");
        }

        await dbConnect();

        // Tìm user và lấy cả trường password
        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
            throw new Error("Email hoặc mật khẩu không chính xác.");
        }

        // So sánh mật khẩu
        // Phải chắc chắn rằng user.password tồn tại (đã được select)
        const isPasswordMatch = await user.comparePassword(credentials.password);

        if (!isPasswordMatch) {
            throw new Error("Email hoặc mật khẩu không chính xác.");
        }

        // Trả về đối tượng user nếu xác thực thành công
        // NextAuth sẽ sử dụng thông tin này để tạo session/JWT.
        return {
            id: user._id.toString(),
            email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Callback này được gọi sau khi xác thực thành công và dùng để tạo JWT.
    async jwt({ token, user }) {
      // Khi đăng nhập lần đầu, 'user' object sẽ có sẵn
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Callback này được gọi để tạo đối tượng session từ JWT.
    async session({ session, token }) {
      // Thêm ID vào đối tượng session để có thể truy cập ở client
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  // Chỉ định trang đăng nhập tùy chỉnh của chúng ta
  pages: {
    signIn: "/login",
  },
  // Secret để ký JWT, rất quan trọng cho môi trường production
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
