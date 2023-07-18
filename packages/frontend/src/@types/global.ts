interface Adress {
  id: string
  employer_id: string
  postal_code: string
  street_address: string
  number: string
  complement: string | null
  city: string
  country: string
  created_at: string
}

export interface Employer {
  id: string
  name: string
  email: string
  birthdate: string
  gender: string
  created_at: string
  user_id: string | null
  adress: Adress[]
}

export interface EmployerResponse {
  employers: Employer[]
}

export interface Remuneration {
  id: string
  remuneration_value: string
  payday: string
  remuneration_type: string
  created_at: string
  employer_id: string
}

export interface RemunerationResponse {
  remunerations: Remuneration[]
}

export interface RemunerationByCity {
  city: string
  sum: string
}

export interface RemunerationByGender {
  gender: string
  sum: string
}

export interface RemunerationByCityResponse {
  remunerations: RemunerationByCity[]
}

export interface RemunerationByGenderResponse {
  remunerations: RemunerationByGender[]
}

export interface RemunerationByRemunerationType {
  _sum: {
    remuneration_value: string
  }
  remuneration_type: string
}

export interface RemunerationByRemunerationTypeResponse {
  remunerations: RemunerationByRemunerationType[]
}
