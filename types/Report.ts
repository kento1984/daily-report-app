export interface Report {
  id: string
  date: string
  visit_location: string
  activity_content: string
  notes: string
  created_at: string
}

export type ReportInsert = Omit<Report, 'id' | 'created_at'>
