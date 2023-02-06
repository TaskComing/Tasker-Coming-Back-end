const Product = require('../models/product');

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: Object
 *      required:
 *        - code
 *        - name
 *      properties:
 *        code:
 *          type:string
 *          description:the code of the product
 *        name:
 *          type:string
 *          description:the name of the product
 *        description:
 *          type:string
 *          description:the description of the product
 *        soldOut:
 *          type:boolean
 *          description:whether the product is out of stock
 *      example:
 *        code: 1
 *        name: pencil
 *        description: This is a pencil
 *        soldOut: false
 *
 */

/**
 * @swagger
 * /v1/products:
 *  get:
 *    summary: Return all products
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: array of products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
async function getProductList(req, res) {
  const products = await Product.find().exec();
  return res.json(products);
}

/**
 * @swagger
 * /v1/products/{code}:
 *  get:
 *    summary: Get specific product by code
 *    tags: [Products]
 *    parameters:
 *      - name: code
 *        in: path
 *        description: filter products by code
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The product selected by code
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 */
async function getProductByCode(req, res) {
  const { code } = req.params;
  const product = await Product.findById(code).exec();
  if (!product) {
    return res.status(404).json({ error: 'product not found' });
  }
  return res.json(product);
}

/**
 * @swagger
 * /v1/products:
 *  post:
 *    summary: Create a new product
 *    tags: [Products]
 *    parameters:
 *      - name: code
 *        in: path
 *        description: filter products by code
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      201:
 *        description: The product is successfully added.
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Product'
 */
async function addProduct(req, res) {
  const { code, name, description, soldOut } = req.body;
  const existingProduct = await Product.findById(code).exec();
  if (existingProduct) {
    return res.sendStatus(409); // The request could not be processed because of conflict in the request,
  }

  const product = new Product({
    code,
    name,
    description,
    soldOut,
  });

  await product.save();
  return res.status(201).json(product);
}

/**
 * @swagger
 * /v1/products/{code}:
 *  put:
 *    summary: Update a specific product
 *    tags: [Products]
 *    parameters:
 *      - name: code
 *        in: path
 *        description: select the product by code
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      201:
 *        description: The product is successfully added.
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Product'
 */
async function updateProductByCode(req, res) {
  const { code } = req.params;
  const { name, description, soldOut } = req.body;
  const product = await Product.findByIdAndUpdate(code, { name, description, soldOut }).exec();

  if (!product) {
    return res.sendStatus(404);
  }

  return res.json(product);
}

module.exports = {
  getProductList,
  getProductByCode,
  addProduct,
  updateProductByCode,
};
