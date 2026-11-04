import raw from './leksa/company.json'

export interface CompanyStat {
  value: string
  label: string
  note?: string
}

export interface Branch {
  city: string
  address: string
}

export interface ContactPerson {
  role: string
  name: string
  title: string
  phone?: string
  email: string
}

export interface RegionTeam {
  key: string
  label: string
  teamName: string
  office: {
    name: string
    companyName: string
    address: string
    note: string
  }
  contacts: ContactPerson[]
}

export interface Company {
  profileParagraphs: string[]
  profileImages: string[]
  stats: CompanyStat[]
  facilities: string[]
  foundingYearNote: string
  ourTeamParagraphs: string[]
  ourTeamImages: string[]
  directorMessageParagraphs: string[]
  directorName: string
  directorTitle: string
  directorCompany: string
  directorImage: string
  whyLeksaHub: { title: string; href: string; image: string }[]
  whyLeksaImage: string
  lexrise: {
    intro: string
    source: string
    brands: string[]
  }
  contact: {
    phone: string
    branches: Branch[]
    headquarters: {
      companyName: string
      address: string
      phone: string
      email: string
      mapEmbedUrl: string
    }
    specialists: ContactPerson[]
    regions: RegionTeam[]
  }
}

export const company = raw as Company
