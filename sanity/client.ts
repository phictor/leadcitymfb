import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'jzkdwhnl', // Replace with yours
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})

const data = await client.fetch(`*[_type == "home"][0]`)
