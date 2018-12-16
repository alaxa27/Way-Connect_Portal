/**
 *
 * Asynchronously loads the component for Banner
 *
 */

import loadable from 'loadable-components';

import Loading from 'components/Loading';

export default loadable(() => import('./index'), {
  LoadingComponent: Loading,
});
