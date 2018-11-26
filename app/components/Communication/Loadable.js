/**
 *
 * Asynchronously loads the component for Communication
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
