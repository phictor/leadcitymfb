export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'mapUrl', title: 'Google Map Link', type: 'url' },
  ],
}
