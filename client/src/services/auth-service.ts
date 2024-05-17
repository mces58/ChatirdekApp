import { LoginData, SignupData } from 'src/constants/types/user';

import APIService from './api-service';

class AuthService {
  public async login(LoginData: LoginData) {
    const authRes = await APIService.post('auth/login', LoginData, undefined);
    return authRes;
  }

  public async signup(SignupData: SignupData) {
    const authRes = await APIService.post('auth/signup', SignupData, undefined);
    return authRes;
  }
}

export default new AuthService();
