import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(
        await Product.findOne({ _id: req.query.id }).populate('category')
      );
    } else {
      res.json(
        await Product.find().populate('category').sort({ createdAt: -1 })
      );
    }
  }

  if (method === 'POST') {
    const {
      title,
      description,
      short_description,
      price,
      images,
      category,
      properties
    } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      short_description,
      price,
      images,
      category,
      properties
    });
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {
      title,
      description,
      short_description,
      price,
      images,
      category,
      properties,
      _id
    } = req.body;
    await Product.updateOne(
      { _id },
      {
        title,
        description,
        short_description,
        price,
        images,
        category,
        properties
      }
    );
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
