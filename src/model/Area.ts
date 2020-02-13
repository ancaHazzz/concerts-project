export type Area = {
  latitude: number
  longitude: number
  radius: number // in km
}

export function validateAreaParams(params: any) {
  if (params.latitude || params.longitude || params.radius) {
    if (!params.latitude || !params.longitude || !params.radius) {
      return false
    }
  }
  return true
}

export function getArea(params: any) {
  if (!params.latitude || !params.longitude || !params.radius) {
    return
  }
  return {
    latitude: params.latitude,
    longitude: params.longitude,
    radius: params.radius
  } as Area
}
