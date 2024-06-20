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

  public getNonFriends = async (token: string): Promise<any> => {
    const response: Response = await apiService.get('/friendship/non-friends', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public sendFriendRequest = async (token: string, friendId: string): Promise<any> => {
    const response: Response = await apiService.get(`/friendship/send/${friendId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public getIncomingFriendRequests = async (token: string): Promise<any> => {
    const response: Response = await apiService.get('/friendship/incoming-requests', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public getOutgoingFriendRequests = async (token: string): Promise<any> => {
    const response: Response = await apiService.get('/friendship/outgoing-requests', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public acceptFriendRequest = async (
    token: string,
    receiverId: string
  ): Promise<any> => {
    const response: Response = await apiService.get(`/friendship/accept/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public undoFriendRequest = async (token: string, receiverId: string): Promise<any> => {
    const response: Response = await apiService.delete(`/friendship/undo/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
}

export default new FriendService();
