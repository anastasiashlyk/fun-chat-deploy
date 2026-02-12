export type ListenerFunction = (parameter?: unknown) => unknown;

export type AppEvents =
  | 'VALIDATE_NAME'
  | 'VALIDATE_PASSWORD'
  | 'CHAT_PARTNER'
  | 'WS:OPEN'
  | 'WS:LOGIN'
  | 'WS:LOGOUT'
  | 'WS:ERROR'
  | 'WS:CLOSE'
  | 'WS:USER_ACTIVE'
  | 'WS:USER_INACTIVE'
  | 'WS:USER_EXTERNAL_LOGIN'
  | 'WS:USER_EXTERNAL_LOGOUT'
  | 'WS:MSG_SEND'
  | 'WS:MSG_FROM_USER'
  | 'WS:MSG_COUNT_NOT_READED_FROM_USER'
  | 'WS:MSG_DELIVER'
  | 'WS:MSG_READ'
  | 'WS:MSG_DELETE'
  | 'WS:MSG_EDIT'
  | 'WS:DISCONNECTED'
  | 'EDIT-REQUEST';
