import { useNavigate } from 'react-router-dom';

import { ReactComponent as LogoImg } from '~/assets/icons/pixema.svg';
import { moviesApi } from '~/store/api/moviesApi/movies.api';
import { useAppDispatch } from '~/store/store.types';

import LogoStyles from './Logo.module.scss';

export const Logo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div
      className={LogoStyles.logoWrap}
      onClick={() => {
        dispatch(moviesApi.util.resetApiState());
        navigate('/');
      }}
    >
      <LogoImg />
    </div>
  );
};
