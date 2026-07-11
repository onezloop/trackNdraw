export type AgeGroup = 'under5' | 'under10' | 'under15'

export interface AgeGroupInfo {
  id: AgeGroup
  label: string
}

export const ageGroups: AgeGroupInfo[] = [
  { id: 'under5', label: 'Under 5' },
  { id: 'under10', label: 'Under 10' },
  { id: 'under15', label: 'Under 15' },
]

export interface Artwork {
  id: string
  name: string
  src: string
  /** Omitted for pictures the child uploaded — those show in every age group. */
  ageGroup?: AgeGroup
}
