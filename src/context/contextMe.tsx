/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import Cookies from 'js-cookie';
import { createContext, useState } from 'react';

interface Me {
  idUser: string;
  isAdmin: boolean;
  userName: string;
  email: string;
  created_at: Date | string;
  avatar: string;
  provider: string;
}

interface Props {
  children: any;
}

interface Values {
  token: string;
  me: Me;
}

export const MeContext = createContext<Values>({
  token: '',
  me: {
    idUser: '',
    isAdmin: false,
    userName: '',
    email: '',
    created_at: '',
    avatar: '',
    provider: '',
  },
});

export const MeContextProvider = ({ children }: Props) => {
  const [token] = useState<string>(Cookies.get('access-token-cici') || '');
  const [me] = useState<Me>({
    idUser: '',
    isAdmin: false,
    userName: '',
    email: '',
    created_at: '',
    avatar: '',
    provider: '',
  });

  const Values: Values = {
    token,
    me,
  };

  return <MeContext.Provider value={Values}>{children}</MeContext.Provider>;
};
