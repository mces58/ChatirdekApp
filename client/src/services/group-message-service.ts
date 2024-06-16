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

  public getGroupMessages = async (token: string, groupId: string): Promise<any> => {
    const response: Response = await apiService.get(`/group/messages/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public sendGroupMessage = async (
    token: string,
    groupId: string,
    message: string
  ): Promise<any> => {
    const response: Response = await apiService.post(
      `/group/messages/send/${groupId}`,
      { message },
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
