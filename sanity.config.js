import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'lead-city-mfb',
  title: 'Lead City MFB Content Management',

  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      {
        name: 'newsArticle',
        title: 'News Article',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'summary',
            title: 'Summary',
            type: 'text',
            validation: Rule => Rule.required().max(200)
          },
          {
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: Rule => Rule.required()
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                {title: 'Technology', value: 'Technology'},
                {title: 'Education', value: 'Education'},
                {title: 'Business', value: 'Business'},
                {title: 'Security', value: 'Security'}
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'author',
            title: 'Author',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'publishDate',
            title: 'Publish Date',
            type: 'date',
            validation: Rule => Rule.required()
          },
          {
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'featured',
            title: 'Featured Article',
            type: 'boolean',
            description: 'Check this to make it the featured article'
          },
          {
            name: 'image',
            title: 'Article Image',
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ],
        preview: {
          select: {
            title: 'title',
            author: 'author',
            media: 'image'
          },
          prepare(selection) {
            const {author} = selection
            return Object.assign({}, selection, {
              subtitle: author && `by ${author}`
            })
          }
        }
      }
    ],
  },
})