import { Response } from 'src/constants/types/response';

import apiService from './api-service';

class ChatService {
  public getUser = async (token: string, id: string): Promise<any> => {
    const response: Response = await apiService.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
}

export default new ChatService();
