import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function FlowImage() {
    const { colorMode } = useColorMode();

    return (
        <img
            src={colorMode === 'dark' ? '/img/dark-flow-fa.webp' : '/img/light-flow-fa.webp'}
            alt="Flow Illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
        />
    );
}
