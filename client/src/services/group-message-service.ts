import { Response } from 'src/constants/types/response';

import apiService from './api-service';

class GroupMessageService {
  public getGroupLastMessages = async (token: string): Promise<any> => {
    const response: Response = await apiService.get('/group/messages/last-message', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public sendImageMessage = async (
    token: string,
    groupId: string,
    imageUri: string
  ): Promise<any> => {
    const response: Response = await apiService.post(
      `/group/messages/send/image/${groupId}`,
      { uri: imageUri },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  public sendAudioMessage = async (
    token: string,
    groupId: string,
    audioUri: string
  ): Promise<any> => {
    const response: Response = await apiService.post(
      `/group/messages/send/audio/${groupId}`,
      { uri: audioUri },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}

export default new GroupMessageService();
