import Category from "./Category";
import ProductDetails from "./ProductDetails";

export interface Product {
    id: string,
    createAt: string,
    updateAt: string,
    createBy: string,
    isDeleted: boolean,
    name: string,
    description: string,
    productCode: string,
    unit: string
    category?: Category;
    productDetails?: ProductDetails;
}