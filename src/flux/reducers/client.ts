import { message } from 'antd';
import { handleActions, ActionMeta } from 'redux-actions';
import * as Actions from 'src/flux/actions/client';
import User from 'src/model/user';

export class ClientState {
  public readonly users: Map<string, User>;
}

export const clientReducer = handleActions({
  GET_USERS: (state, action: ActionMeta<string, {}>) => {
    if (action.error) {
      message.error(`Error fetching users`);
    } else {
      return Object.assign({}, state, {
        users: action.payload,
      });
    }
    return state;
  },
}, {
  users: new Map<string, User>(),
});