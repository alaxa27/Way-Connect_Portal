/**
 *
 * Asynchronously loads the component for Fidelity
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
