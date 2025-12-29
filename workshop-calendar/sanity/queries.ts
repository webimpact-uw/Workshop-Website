import { defineQuery } from 'next-sanity'

export const WORKSHOPS_QUERY = defineQuery(`
  *[_type == "workshop"] | order(dateTime desc) {
    _id,
    title,
    description,
    workshopType,
    dateTime,
    dayOfWeek,
    slideLink,
    recordingLink,
    preworkshopMaterials
  }
`)

export const OFFICERS_QUERY = defineQuery(`
  *[_type == "officer"] | order(order asc) {
    _id,
    name,
    role,
    yearInSchool,
    order
  }
`)
