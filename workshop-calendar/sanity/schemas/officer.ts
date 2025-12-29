import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'officer',
  title: 'Officer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearInSchool',
      title: 'Year in School',
      type: 'string',
      options: {
        list: [
          { title: 'Freshman', value: 'freshman' },
          { title: 'Sophomore', value: 'sophomore' },
          { title: 'Junior', value: 'junior' },
          { title: 'Senior', value: 'senior' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      year: 'yearInSchool',
    },
    prepare({ title, subtitle, year }) {
      return {
        title,
        subtitle: `${subtitle} - ${year}`,
      }
    },
  },
})
