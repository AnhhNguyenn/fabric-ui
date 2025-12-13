
// Định nghĩa màu sắc của sản phẩm
export interface ProductColor {
  name: string;      // Tên màu (ví dụ: "Hồng Pastel")
  hex: string;       // Mã màu hex (ví dụ: "#FFD1DC")
}

// Định nghĩa cấu trúc cho một sản phẩm
export interface Product {
  _id: string;                      // ID định danh duy nhất
  name: string;                     // Tên sản phẩm
  slug: string;                     // Slug để tạo URL thân thiện
  price: number;                    // Giá sản phẩm
  description: string;              // Mô tả chi tiết sản phẩm
  imageUrls: string[];              // Mảng các đường dẫn ảnh
  colors: ProductColor[];           // Mảng các lựa chọn màu sắc
  tags: string[];                   // Mảng các từ khóa hoặc tag
}

// Định nghĩa cấu trúc cho cấu hình trang web (sử dụng cho metadata)
export interface SiteConfig {
    title: string;
    description: string;
    url: string;
}
