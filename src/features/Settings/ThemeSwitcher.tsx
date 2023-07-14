import settingsPageStyles from '~/pages/Settings/Settings.module.scss';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { selectTheme, themeActions } from '~/store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '~/store/store.types';

export const ThemeSwitcher = () => {
  const isLightTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  return (
    <div className={settingsPageStyles.dataWrap}>
      <h2>Тема</h2>
      <div
        className={settingsPageStyles.data}
        style={{ flexDirection: 'column', gap: '20px' }}
      >
        <div>
          <span>{isLightTheme ? 'Светлая' : 'Темная'}</span>
          <span>{`Используется ${
            isLightTheme ? 'светлая' : 'темная'
          } тема`}</span>
        </div>
        <Button
          appearance={ButtonAppearance.Primary}
          text={'Изменить тему'}
          shouldFitContainer
          onClick={() => {
            dispatch(themeActions.changeTheme());
          }}
        />
      </div>
    </div>
  );
};
