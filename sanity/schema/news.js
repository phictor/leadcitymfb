export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
  ],
}
