import { useEffect, type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import { useHistory } from '@docusaurus/router';

function HomepageHeader() {

  const history = useHistory();

  useEffect(() => {
    history.replace("/docs/Home");
  }, [history]);

  return null; 
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}>
      <HomepageHeader />
      {/* <main>
      </main> */}
    </Layout>
  );
}
