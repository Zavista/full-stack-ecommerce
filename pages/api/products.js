import { connectMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";


export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handle(req, res) {
    await connectMongoose();
    
    const { ids } = req.query;
  
    if (ids) {
      const idsArray = ids.split(',');
  
      const products = await Product.find({
        '_id': { $in: idsArray }
      }).exec();
  
      res.json(products);
    } else {
      const allProducts = await findAllProducts();
      res.json(allProducts);
    }
  }