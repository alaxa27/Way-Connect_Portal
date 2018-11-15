/**
 *
 * Asynchronously loads the component for Journey
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
