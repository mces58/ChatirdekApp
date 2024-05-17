import APIService from './api-service';

class ChatService {
  public async getLastMessages() {
    const res = await APIService.get('users/last-messages', undefined);
    return res;
  }
}

export default new ChatService();
