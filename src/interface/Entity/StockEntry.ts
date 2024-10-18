import ProductHeader from "./ProductHeader";
import Supplier from "./Supplier";

export interface ReceiveItem {
    id: string;
    create_at: string;
    update_at: string;
    isDeleted: boolean;
    quantity: number;
    price: string;
    totalAmount: string;
    product: ProductHeader;
}

interface StockEntry {
    id: string;
    create_at: string;
    update_at: string;
    isDeleted: boolean;
    receiveDate: string;
    receiveBy: string;
    status: string;
    description: string;
    totalAmount: string;
    receiveCode: string;
    supplier: Supplier;
    receiveItems: ReceiveItem[];
}

export default StockEntry;