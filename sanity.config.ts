import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {markdownSchema} from './src'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'

export default defineConfig({
  projectId: 'ppsg7ml5',
  dataset: 'test',
  plugins: [
    structureTool(),
    presentationTool({
      allowOrigins: ['https://*.sanity.dev', 'http://localhost:*'],
      previewUrl: 'https://test-studio.sanity.dev/preview/index.html',
    }),
    markdownSchema(),
    visionTool(),
  ],
  schema: {
    types: [
      {
        type: 'document',
        name: 'markdownTest',
        title: 'Markdown test',
        fields: [
          {type: 'string', name: 'title', title: 'Title'},
          {type: 'markdown', name: 'markdown', title: 'Markdown'},
        ],
      },
    ],
  },
  tasks: {enabled: false},
  scheduledPublishing: {enabled: false},
  announcements: {enabled: false},
  beta: {create: {startInCreateEnabled: false}},
})
