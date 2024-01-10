import instance from '../Services/axios';

export function getRequest(URL: string) {
  return instance.get(`/api/v1/${URL}`).then((response: any) => response);
}

export function postRequest(URL: string, payload: object) {
  return instance
    .post(`/api/v1/${URL}`, payload)
    .then((response: any) => response);
}

export function putRequest(URL: string, payload: object) {
  return instance
    .put(`/api/v1/${URL}`, payload)
    .then((response: any) => response);
}

export function patchRequest(URL: string, payload: object) {
  return instance
    .patch(`/api/v1/${URL}`, payload)
    .then((response: any) => response);
}

export function deleteRequest(URL: string) {
  return instance.delete(`/api/v1/${URL}`).then((response: any) => response);
}
