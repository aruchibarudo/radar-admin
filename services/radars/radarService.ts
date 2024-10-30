import ApiService from '@/services/api/apiService'
import {
  Item,
  Radar,
  RadarItem,
  UpdateRadarItemParams,
  UpdateRadarParams,
} from '@/services/radars/types'

export const getRadars = () => {
  return ApiService.get<Radar[]>('/radars')
}

export const getRadar = ({ id }: Pick<Radar, 'id'>) => {
  return ApiService.get<Radar>(`/radar/${id}`)
}

export const getRadarItem = ({ id }: Pick<RadarItem, 'id'>) => {
  return ApiService.get<Item>(`/item/${id}`)
}

export const createRadar = ({ data }: UpdateRadarParams) => {
  return ApiService.post<Radar>('/radar', { body: data })
}

export const updateRadar = ({ id, data }: UpdateRadarParams) => {
  return ApiService.post<Radar>(`/radar/${id}`, { body: data })
}

export const createRadarItem = ({ id, data }: UpdateRadarItemParams) => {
  return ApiService.post<RadarItem>(`/radar/${id}/items`, { body: [data] })
}

export const updateRadarItem = ({ id, data }: UpdateRadarItemParams) => {
  return ApiService.put<RadarItem>(`/item/${id}`, { body: data })
}

export const deleteRadarItem = ({ id }: Pick<RadarItem, 'id'>) => {
  return ApiService.delete<RadarItem>(`/item/${id}`)
}
