export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    { name: 'name', title: 'Product Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'image', title: 'Product Image', type: 'image' },
  ],
}
