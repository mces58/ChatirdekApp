import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { BASE_URL } from './baseUrl';

class APIService {
  private instance: AxiosInstance;
  private static readonly BASE_URL = BASE_URL;

  constructor() {
    this.instance = axios.create({
      baseURL: APIService.BASE_URL,
      withCredentials: true,
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

export default new APIService();
