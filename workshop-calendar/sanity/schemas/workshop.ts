import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Workshop Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'workshopType',
      title: 'Workshop Type',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: 'Coding', value: 'coding' },
          { title: 'Design', value: 'design' },
          { title: 'Collab Lecture', value: 'collab' },
          { title: 'Project Manager', value: 'pm' },
        ],
      },
    }),
    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'array',
      description: 'Optional skill level for coding/design workshops',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      description: 'Who can attend this workshop',
      options: {
        list: [
          { title: 'Member Only', value: 'member' },
          { title: 'General Public', value: 'public' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'quarter',
      title: 'Quarter',
      type: 'string',
      options: {
        list: [
          { title: 'Fall', value: 'fall' },
          { title: 'Winter', value: 'winter' },
          { title: 'Spring', value: 'spring' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(2024).max(2030),
    }),
    defineField({
      name: 'dateTime',
      title: 'Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slideLink',
      title: 'Workshop Slide Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'recordingLink',
      title: 'Workshop Recording Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'demoLink',
      title: 'Demo Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'preworkshopMaterials',
      title: 'Pre-Workshop Materials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Material Title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      types: 'workshopType',
      date: 'dateTime',
    },
    prepare({ title, types, date }) {
      const typeLabels = types?.join(', ') || 'No type'
      return {
        title,
        subtitle: `${typeLabels} - ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
})
