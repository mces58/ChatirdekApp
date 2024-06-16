import { Response } from 'src/constants/types/response';

import apiService from './api-service';

class GroupService {
  public getGroups = async (token: string): Promise<any> => {
    const response: Response = await apiService.get('/groups', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public getGroup = async (token: string, groupId: string): Promise<any> => {
    const response: Response = await apiService.get(`/groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public updateGroup = async (
    token: string,
    groupId: string,
    data: any
  ): Promise<any> => {
    const response: Response = await apiService.put(`/groups/${groupId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public getFriendsNotInGroup = async (token: string, groupId: string): Promise<any> => {
    const response: Response = await apiService.get(
      `/groups/${groupId}/friends-not-in-group`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  public addMember = async (token: string, groupId: string, data: any): Promise<any> => {
    const response: Response = await apiService.post(
      `/groups/${groupId}/members/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  public removeMember = async (
    token: string,
    groupId: string,
    memberId: string
  ): Promise<any> => {
    const response: Response = await apiService.delete(
      `/groups/${groupId}/members/remove/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  public leaveGroup = async (token: string, groupId: string): Promise<any> => {
    const response: Response = await apiService.delete(
      `/groups/${groupId}/members/leave`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  public createGroup = async (token: string, data: any): Promise<any> => {
    const response: Response = await apiService.post('/groups', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  public makeAdmin = async (
    token: string,
    groupId: string,
    userId: string
  ): Promise<any> => {
    const response: Response = await apiService.put(
      `/groups/${groupId}/make-owner/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}

export default new GroupService();
