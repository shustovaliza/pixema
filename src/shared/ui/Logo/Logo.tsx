import { useNavigate } from 'react-router-dom';

import { ReactComponent as LogoImg } from '~/assets/icons/pixema.svg';
import { isItOnTheMainPage } from '~/shared/utils/utils';

import LogoStyles from './Logo.module.scss';

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className={LogoStyles.logoWrap}
      onClick={() => (isItOnTheMainPage() ? null : navigate('/'))}
    >
      <LogoImg />
    </div>
  );
};
