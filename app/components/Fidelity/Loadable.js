/**
 *
 * Asynchronously loads the component for Fidelity
 *
 */

import loadable from 'loadable-components';

import Loading from 'components/Loading';

export default loadable(() => import('./index'), {
  LoadingComponent: Loading,
});
