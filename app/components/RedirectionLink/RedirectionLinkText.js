const RedirectionLinkText = props => {
  switch (props.type) {
    case 'tel':
      return 'Contactez nous';
    case 'instagram':
      return 'Retrouvez-nous sur Instagram';
    case 'facebook':
      return 'Retrouvez-nous sur Facebook';
    case 'web':
      return 'Visitez notre site-web';
    default:
      return null;
  }
};

export default RedirectionLinkText;
