import React from 'react';
import TOC from '@theme-original/TOC';
import { useLocation } from '@docusaurus/router';

export default function TOCWrapper(props) {
  const location = useLocation();
  console.log('Current path:', location.pathname);
  if (location.pathname === '/docs/Home') return null;
  return <TOC {...props} />;
}