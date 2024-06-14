import { RegisterData } from 'src/constants/types/user';

import apiService from './api-service';

class AuthService {
  public register = async (data: RegisterData): Promise<any> => {
    const response = await apiService.post('/auth/register', data);
    return response;
  };
}

export default new AuthService();
