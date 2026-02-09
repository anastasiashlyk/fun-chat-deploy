export type Message = {
  id: string | null;
  type: MessageType;
  payload: Payload | null;
};

export type MessageType =
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'ERROR'
  | 'USER_EXTERNAL_LOGIN'
  | 'USER_EXTERNAL_LOGOUT'
  | 'USER_ACTIVE'
  | 'MSG_SEND'
  | 'MSG_FROM_USER'
  | 'MSG_COUNT_NOT_READED_FROM_USER'
  | 'MSG_DELIVER'
  | 'MSG_READ'
  | 'MSG_DELETE'
  | 'MSG_EDIT';

export type User = {
  login: string;
  password?: string;
  isLogined?: boolean;
};

export type Error = {
  error: string;
};

export type Message_ = {
  id?: string;
  from?: string;
  to?: string;
  text?: string;
  datetime?: number;
  status?: {
    isDelivered?: boolean;
    isReaded?: boolean;
    isEdited?: boolean;
  };
};

export type Payload = {
  user?: User;
  error?: string;
  users?: User[];
  message?: Message_;
  messages?: Message_[];
  count?: number;
};
