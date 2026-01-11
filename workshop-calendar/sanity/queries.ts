import { defineQuery } from 'next-sanity'

export const WORKSHOPS_QUERY = defineQuery(`
  *[_type == "workshop"] | order(dateTime desc) {
    _id,
    title,
    description,
    workshopType,
    skillLevel,
    audience,
    quarter,
    year,
    dateTime,
    dayOfWeek,
    slideLink,
    recordingLink,
    demoLink,
    preworkshopMaterials
  }
`)

export const WORKSHOPS_BY_QUARTER_QUERY = defineQuery(`
  *[_type == "workshop" && quarter == $quarter && year == $year] | order(dateTime desc) {
    _id,
    title,
    description,
    workshopType,
    skillLevel,
    audience,
    quarter,
    year,
    dateTime,
    dayOfWeek,
    slideLink,
    recordingLink,
    demoLink,
    preworkshopMaterials
  }
`)

export const AVAILABLE_QUARTERS_QUERY = defineQuery(`
  *[_type == "workshop" && defined(quarter) && defined(year)] | order(year desc, quarter desc) {
    quarter,
    year
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
