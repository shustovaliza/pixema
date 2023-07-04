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
      className={`${passThroughProperties.className || ''} ${classNames({
        [buttonStyles.btn]: true,
        [buttonStyles[appearance]]: true
      })}`}
      style={{
        ...passThroughProperties.style,
        width: shouldFitContainer ? '100%' : passThroughProperties.style?.width
      }}
    >
      {text}
      {icon && <div className={buttonStyles.icon}>{icon}</div>}
    </button>
  );
};
