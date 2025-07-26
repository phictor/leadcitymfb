// sanity.config.ts
import { defineConfig } from 'sanity'

export default defineConfig({
  name: 'default',
  title: 'Lead City MfB',
  projectId: 'jzkdwhnl',       // ✅ from your dashboard
  dataset: 'production',        // ✅ default unless you made another
  basePath: '/studio',          // optional path
  plugins: [],
  schema: {
    types: [],
  },
})
