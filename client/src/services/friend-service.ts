import { Response } from 'src/constants/types/response';

import apiService from './api-service';

class FriendService {
  public getFriends = async (token: string): Promise<any> => {
    const response: Response = await apiService.get('/friendship/friends', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public removeFriend = async (token: string, friendId: string): Promise<any> => {
    const response: Response = await apiService.delete(`/friendship/remove/${friendId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
}

export default new FriendService();
