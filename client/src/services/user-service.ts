import APIService from './api-service';

class UserService {
  public async getUsers() {
    const authRes = await APIService.get('users', undefined);
    return authRes;
  }
}

export default new UserService();
