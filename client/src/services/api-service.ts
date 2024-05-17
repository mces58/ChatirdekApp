import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class APIService {
  private instance: AxiosInstance;
  private static authToken: string | null = null;

  /**
   * Base API url
   */
  private static readonly BASE_URL = 'http://172.16.24.239:5000/api';

  constructor() {
    this.instance = axios.create({
      baseURL: APIService.BASE_URL,
      withCredentials: true,
    });

    // Interceptor to add token to headers
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (APIService.authToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${APIService.authToken}`,
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Method to set the token
  public static setAuthToken(token: string) {
    APIService.authToken = token;
  }

  // Method to clear the token
  public static clearAuthToken() {
    APIService.authToken = null;
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
