/**
 *
 * Asynchronously loads the component for CustomerService
 *
 */

import loadable from 'loadable-components';

import Loading from 'components/Loading';

export default loadable(() => import('./index'), {
  LoadingComponent: Loading,
});
