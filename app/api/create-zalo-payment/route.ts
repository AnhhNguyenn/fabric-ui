
import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { CartItem } from '../../../context/CartContext';

interface ZaloPaymentRequest {
    amount: number;
    cartItems: CartItem[];
}

// Thêm kiểu cho đối tượng order
interface ZaloOrder {
    app_id: string;
    app_trans_id: string;
    app_user: string;
    app_time: number;
    amount: number;
    item: string;
    description: string;
    embed_data: string;
    bank_code: string;
    mac?: string; // mac là tùy chọn lúc đầu, nhưng sẽ được thêm vào
}

export async function POST(req: Request) {
    try {
        const { amount: totalAmount, cartItems } = await req.json() as ZaloPaymentRequest;

        const config = {
            app_id: process.env.ZALO_APP_ID || "2553",
            key1: process.env.ZALO_KEY_1 || "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: process.env.ZALO_KEY_2 || "kLtgPl8HHhgwFeCrcA2a3resGCdT55jV",
            endpoint: process.env.ZALO_ENDPOINT || "https://sb-openapi.zalopay.vn/v2/create"
        };

        const apptransid = `${new Date().getFullYear().toString().slice(-2)}${("0" + (new Date().getMonth() + 1)).slice(-2)}${("0" + new Date().getDate()).slice(-2)}_${Math.random().toString(36).substring(7)}`;

        // Khai báo order với kiểu ZaloOrder
        const order: ZaloOrder = {
            app_id: config.app_id,
            app_trans_id: apptransid, 
            app_user: "user123",
            app_time: Date.now(),
            amount: totalAmount,
            item: JSON.stringify(cartItems.map(item => ({ 
                id: item.productId, 
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))),
            description: `Thanh toan cho don hang #${apptransid}`,
            embed_data: JSON.stringify({
                redirecturl: `http://localhost:3000/payment-result?apptransid=${apptransid}` 
            }),
            bank_code: "",
        };

        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const { data: zaloResponse } = await axios.post(config.endpoint, null, { params: order });

        if (zaloResponse.return_code === 1) {
            return NextResponse.json({ orderUrl: zaloResponse.order_url });
        }

        return NextResponse.json({ error: zaloResponse.return_message }, { status: 400 });

    } catch (error) {
        console.error("ZaloPay API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
