/*
 * Question Messages
 *
 * This contains all the text for the Question component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Question';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Question component!',
  },
});
