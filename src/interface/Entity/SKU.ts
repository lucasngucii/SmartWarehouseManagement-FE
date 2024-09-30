import AttributeDetailType from "../AttributeDetail";

interface SKU {
    id:string,
    create_at:string,
    update_at:string,
    isDeleted:boolean,
    skuCode:string,
    batchCode:string,
    weight:string,
    dimension:string,
    description:string,
    brand: AttributeDetailType,
    color: AttributeDetailType,
    size: AttributeDetailType,
    material: AttributeDetailType,
}

export default SKU;