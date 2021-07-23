/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface Me {
  idUser: string;
  isAdmin: number;
  userName: string;
  email: string;
  created_at: Date | string;
  avatar: string;
  provider: string;
  phone: number | null;
  isBanner: number;
  ciciRank: number;
  validatedEmail: number;
}

interface Props {
  children: any;
}

interface Values {
  token: string;
  me: Me;
  setMe: Dispatch<SetStateAction<Me>>;
}

export const MeContext = createContext<Values>({
  token: '',
  me: {
    idUser: '',
    isAdmin: 0,
    userName: '',
    email: '',
    created_at: '',
    avatar: '',
    provider: '',
    phone: 0,
    isBanner: 0,
    ciciRank: 0,
    validatedEmail: 0,
  },
  setMe: () => false,
});

export const MeContextProvider = ({ children }: Props) => {
  const [token] = useState<string>(Cookies.get('access-token-cici') || '');
  const [me, setMe] = useState<Me>({
    idUser: '',
    isAdmin: 0,
    userName: '',
    email: '',
    created_at: '',
    avatar: '',
    provider: '',
    phone: 0,
    isBanner: 0,
    ciciRank: 0,
    validatedEmail: 0,
  });

  const Values: Values = {
    token,
    me,
    setMe,
  };

  return <MeContext.Provider value={Values}>{children}</MeContext.Provider>;
};
