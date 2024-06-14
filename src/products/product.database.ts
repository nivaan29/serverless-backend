import { Product, Products, UnitProduct } from "./product.interface";
import { v4 as random } from "uuid";
import fs from "fs";

let products: Products = loadProducts();

function loadProducts(): Products {
  try {
    const data = fs.readFileSync("./products.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error ${error}`);
    return {};
  }
}

function saveProducts() {
    try {
        fs.writeFileSync("./products.json", JSON.stringify(products), "utf-8");
        console.log("Products saved successfully!")
    } catch (error) {
        console.log("Error", error)
    }
}


export const findAll = async () : Promise<UnitProduct[]> => Object.values(products)

export const findOne = async (id : string) : Promise<UnitProduct> => products[id]

export const create = async (productInfo : Product) : Promise<null | UnitProduct> => {

    let id = random()

    let product = await findOne(id)

    while (product) {
        id = random ()
        await findOne(id)
    }

    products[id] = {
        id : id,
        ...productInfo
    }

    saveProducts()

    return products[id]
}