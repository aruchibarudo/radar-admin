export enum ProbationResultKey {
  FttMatches = 'ftt_matches',
  FttNotMatches = 'ftt_not_matches',
}
export type ProbationResult =
  | ProbationResultKey.FttMatches
  | ProbationResultKey.FttNotMatches
  | string

export type RadarItem = {
  id: string
  name: string
  description: string
  ring: string
  quadrant: string
  ru: boolean
  probation_result: ProbationResult
}

export type Radar = {
  id: string
  name: string
  description: string
  rings: string[]
  quadrants: string[]
  items: RadarItem[]
}

export type ItemRadar = Pick<Radar, 'id'> & Pick<RadarItem, 'quadrant'>
export type Item = Omit<RadarItem, 'quadrant'> & { radars: ItemRadar[] }

export type UpdateRadarParams = {
  id?: Radar['id']
  data: Omit<Radar, 'id' | 'items'>
}

export type RadarItemFormQuadrant = Pick<RadarItem, 'id'> & {
  quadrant: string
}
export type UpdateRadarItemParams = Pick<RadarItem, 'id'> & {
  data: Omit<RadarItem, 'id' | 'quadrant'> & {
    radars: RadarItemFormQuadrant[]
  }
}
