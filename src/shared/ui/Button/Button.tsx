import { type ButtonHTMLAttributes, type ReactElement } from 'react';

import classNames from 'classnames';

import buttonStyles from './Button.module.scss';
import { ButtonAppearance, type ButtonAppearances } from './Button.types';

export const Button = ({
  text = null,
  icon = null,
  appearance = ButtonAppearance.IconButton,
  shouldFitContainer,
  ...passThroughProperties
}: {
  text?: string | null;
  icon?: ReactElement | null;
  appearance?: ButtonAppearances;
  shouldFitContainer?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...passThroughProperties}
      className={classNames({
        [buttonStyles.btn]: true,
        [buttonStyles[appearance]]: true
      })}
      style={shouldFitContainer ? { width: '100%' } : undefined}
    >
      {text}
      {icon && <div className={buttonStyles.icon}>{icon}</div>}
    </button>
  );
};
