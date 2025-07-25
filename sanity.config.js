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
      // News Articles
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
      },
      
      // Banking Products
      {
        name: 'bankingProduct',
        title: 'Banking Product',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 96,
            }
          },
          {
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            validation: Rule => Rule.required().max(150)
          },
          {
            name: 'fullDescription',
            title: 'Full Description',
            type: 'text',
            validation: Rule => Rule.required()
          },
          {
            name: 'category',
            title: 'Product Category',
            type: 'string',
            options: {
              list: [
                {title: 'Savings Account', value: 'savings'},
                {title: 'Current Account', value: 'current'},
                {title: 'Fixed Deposit', value: 'fixed-deposit'},
                {title: 'Loans', value: 'loans'},
                {title: 'Digital Banking', value: 'digital'}
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{type: 'string'}],
            description: 'List the main features of this product'
          },
          {
            name: 'requirements',
            title: 'Requirements',
            type: 'array',
            of: [{type: 'string'}],
            description: 'Requirements to open/apply for this product'
          },
          {
            name: 'interestRate',
            title: 'Interest Rate',
            type: 'string',
            description: 'e.g., "2.5% per annum" or "Competitive rates"'
          },
          {
            name: 'minimumAmount',
            title: 'Minimum Amount',
            type: 'string',
            description: 'e.g., "₦1,000" or "No minimum balance"'
          },
          {
            name: 'icon',
            title: 'Product Icon',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'active',
            title: 'Active Product',
            type: 'boolean',
            initialValue: true,
            description: 'Uncheck to hide this product from the website'
          }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'category',
            media: 'icon'
          }
        }
      },

      // Branch Information
      {
        name: 'branch',
        title: 'Branch',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Branch Name',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'address',
            title: 'Full Address',
            type: 'text',
            validation: Rule => Rule.required()
          },
          {
            name: 'city',
            title: 'City',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'state',
            title: 'State',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: Rule => Rule.email()
          },
          {
            name: 'workingHours',
            title: 'Working Hours',
            type: 'object',
            fields: [
              {
                name: 'weekdays',
                title: 'Weekdays',
                type: 'string',
                initialValue: 'Monday - Friday: 8:00 AM - 4:00 PM'
              },
              {
                name: 'saturday',
                title: 'Saturday',
                type: 'string',
                initialValue: 'Saturday: 9:00 AM - 2:00 PM'
              },
              {
                name: 'sunday',
                title: 'Sunday',
                type: 'string',
                initialValue: 'Sunday: Closed'
              }
            ]
          },
          {
            name: 'services',
            title: 'Available Services',
            type: 'array',
            of: [{type: 'string'}],
            description: 'List services available at this branch'
          },
          {
            name: 'latitude',
            title: 'Latitude',
            type: 'number',
            description: 'For Google Maps integration'
          },
          {
            name: 'longitude',
            title: 'Longitude',
            type: 'number',
            description: 'For Google Maps integration'
          },
          {
            name: 'isHeadOffice',
            title: 'Head Office',
            type: 'boolean',
            description: 'Mark if this is the head office'
          },
          {
            name: 'active',
            title: 'Active Branch',
            type: 'boolean',
            initialValue: true,
            description: 'Uncheck to hide this branch from the website'
          }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'city'
          }
        }
      },

      // Company Information
      {
        name: 'companyInfo',
        title: 'Company Information',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Section Title',
            type: 'string',
            validation: Rule => Rule.required(),
            description: 'e.g., "About Us", "Our Mission", "Leadership Team"'
          },
          {
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: Rule => Rule.required()
          },
          {
            name: 'section',
            title: 'Page Section',
            type: 'string',
            options: {
              list: [
                {title: 'About Us - Main', value: 'about-main'},
                {title: 'About Us - Mission', value: 'about-mission'},
                {title: 'About Us - Vision', value: 'about-vision'},
                {title: 'About Us - Values', value: 'about-values'},
                {title: 'Home - Hero Section', value: 'home-hero'},
                {title: 'Home - Why Choose Us', value: 'home-why-choose'},
                {title: 'Contact - Office Info', value: 'contact-info'}
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this appears on the page (1, 2, 3...)'
          },
          {
            name: 'image',
            title: 'Section Image',
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'section'
          }
        }
      },

      // FAQ Items
      {
        name: 'faq',
        title: 'FAQ',
        type: 'document',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            validation: Rule => Rule.required()
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                {title: 'General Banking', value: 'general'},
                {title: 'Account Opening', value: 'account-opening'},
                {title: 'Loans', value: 'loans'},
                {title: 'Digital Banking', value: 'digital'},
                {title: 'Security', value: 'security'}
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this FAQ appears'
          },
          {
            name: 'active',
            title: 'Active FAQ',
            type: 'boolean',
            initialValue: true
          }
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'category'
          }
        }
      }
    ],
  },
})