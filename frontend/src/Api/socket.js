import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

class SocketApi {
  constructor() {
    this.socket = null;
  }

  createConnection(t) {
    this.socket = io();

    this.socket.on('connect', () => {
      console.log('connect');
    });

    this.socket.on('disconnect', toast, () => {
      toast.error(t('toast.server_connection_lost'));
    });
  }

  onNewMessage(dispatch, addMessageAction) {
    this.socket.on('newMessage', (message) => {
      dispatch(addMessageAction(message));
    });
  }

  onNewChannel(dispatch, addChannelAction, t) {
    this.socket.on('newChannel', (channel) => {
      dispatch(addChannelAction(channel));
      toast.success(t('toast.channel_created_success'));
    });
  }

  onRenameChannel(dispatch, renameChannelAction, t) {
    this.socket.on('renameChannel', (payload) => {
      dispatch(renameChannelAction(payload));
      toast.success(t('toast.channel_renamed_success'));
    });
  }

  onRemoveChannel(dispatch, removeChannel, removeMessagesByChannelId, t) {
    this.socket.on('removeChannel', (payload) => {
      const { id } = payload;
      dispatch(removeChannel(id));
      dispatch(removeMessagesByChannelId(id));
      toast.success(t('toast.channel_removed_success'));
    });
  }
}

export default new SocketApi();
