import { Response } from 'src/constants/types/response';
import { ForgotPassword, LoginData, RegisterData } from 'src/constants/types/user';

import apiService from './api-service';

class AuthService {
  public register = async (data: RegisterData): Promise<any> => {
    const response: Response = await apiService.post('/auth/register', data);
    return response;
  };

  public login = async (data: LoginData): Promise<any> => {
    const response: Response = await apiService.post('/auth/login', data);
    return response;
  };

  public forgotPassord = async (data: ForgotPassword): Promise<any> => {
    const response: Response = await apiService.post('/auth/password/forgot', data);
    return response;
  };

  public resetPassword = async (data: ForgotPassword): Promise<any> => {
    const response: Response = await apiService.put('/auth/password/reset', data);
    return response;
  };
}

export default new AuthService();
