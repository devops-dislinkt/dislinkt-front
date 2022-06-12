export class Profile {
  username: string
  id: number

  // basic info
  first_name: string
  last_name: string
  email: string
  role: 'admin' | 'user'
  phone_number: string
  birthday: Date
  biography: string
  skills: string
  interests: string
  private: boolean

  // work experience
  work_experience: {
    title: string
    type: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'FREELANCE' | 'CONTRACT'
    company: string
    location: string
    currently_working: string
    start_date: Date
    end_date: Date
  }

  // education
  education: {
    school: string
    degree: string
    field_of_study: string
    start_date: Date
    end_date: Date
    description: string
  }
}