export interface Issue {
  comments: any[] | null
  created_at: string
  creator: {
    id: string, user_metadata: {
      email: string, first_name: string, full_name: string, last_name: string, username: string
    }
  }
  description: string | null
  executor: string | null
  id: number
  priority: number
  stage: any | null
  state: number
  title: string
  type: number
  updated_at: string
  isEnded: boolean
}