import SKU from "./SKU";
import Supplier from "./Supplier";

interface Image {
    url: string;
    publicId: string;
}

interface ProductDetails {
    id: string;
    create_at: string;
    update_at: string;
    isDeleted: boolean;
    quantity: number;
    images: Image[];
    sku: SKU;
    supplier: Supplier;
}

export default ProductDetails;