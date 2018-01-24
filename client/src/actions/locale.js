import { updateIntl } from 'react-intl-redux';
import messages from '../utils/messages';

export default function changeLocale(locale) {
  return (dispatch) => {
    dispatch(updateIntl({
      locale,
      messages: messages[locale],
    }));
  };
}
