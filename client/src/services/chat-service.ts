import { Response } from 'src/constants/types/response';

import apiService from './api-service';

class ChatService {
  public getLastMessages = async (token: string): Promise<any> => {
    const response: Response = await apiService.get('/messages/last-messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public sendImageMessage = async (
    token: string,
    receiverId: string,
    imageUri: string
  ): Promise<any> => {
    const response: Response = await apiService.post(
      `/messages/send/image/${receiverId}`,
      { uri: imageUri },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}

export default new ChatService();
