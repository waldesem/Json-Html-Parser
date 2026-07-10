export interface Education {
  educationType: string
  institutionName?: string
  endYear?: string
  specialty?: string
}

export interface Expirience {
  name: string
  beginDate: string
  endDate?: string
  currentJob?: string
  position: string
  address?: string
  fireReason?: string
}

export interface Names {
  lastNameBeforeChange?: string
  firstNameBeforeChange?: string
  midNameBeforeChange?: string
  changed?: string
  reason?: string
}

export interface Organizations {
  name: string
  activity: string
  inn?: string
}

export interface Conditions {
  education: Education[]
  experience: Expirience[]
  nameWasChanged: Names[]
  organizations: Organizations[]
}

export interface Data {
  positionName: string
  department?: string
  lastName: string
  firstName: string
  midName?: string
  birthday: string
  birthplace?: string
  citizen: string
  additionalCitizenship?: string
  snils?: string
  inn?: string
  maritalStatus?: string
  regAddress?: string
  validAddress?: string
  contactPhone?: string
  email?: string
  passportSerial?: string
  passportNumber?: string
  passportIssuedBy?: string
  passportIssueDate?: string
}

export interface Items {
  key: string
  keys?: (keyof Data)[]
  label: string
  foo?: Function
  attr?: string
}

export interface Schemas {
  key?: keyof Data | keyof Conditions
  keys?: (keyof Data)[]
  label?: string
  tag?: 'caption' | 'thead'
  foo?: Function
  attr?: string
  items?: Items[]
}
