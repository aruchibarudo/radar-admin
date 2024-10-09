export enum RadarItemProbationResult {
  FttMatches = 'ftt_matches',
  FttNotMatches = 'ftt_not_matches',
}

export type RadarItem = {
  id: string
  name: string
  description: string
  ring: string
  quadrant: string
  ru: boolean
  probation_result: RadarItemProbationResult
}

export type Radar = {
  id: string
  name: string
  description: string
  rings: string[]
  quadrants: string[]
  items: RadarItem[]
}

export type UpdateRadarParams = Pick<Radar, 'id'> & {
  data: Omit<Radar, 'id' | 'items'>
}

export type UpdateRadarItemParams = Pick<RadarItem, 'id'> & {
  data: Omit<RadarItem, 'id' | 'quadrant'> & {
    radars: {
      id: string
      quadrant: string
    }[]
  }
}
