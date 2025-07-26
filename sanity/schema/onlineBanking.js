export default {
  name: 'onlineBanking',
  title: 'Online Banking',
  type: 'document',
  fields: [
    { name: 'serviceName', title: 'Service Name', type: 'string' },
    { name: 'details', title: 'Details', type: 'array', of: [{ type: 'block' }] },
    { name: 'icon', title: 'Icon/Image', type: 'image' },
  ],
}
