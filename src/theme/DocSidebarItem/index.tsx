import React from 'react';
import OriginalDocSidebarItem from '@theme-original/DocSidebarItem';
import type { Props } from '@theme/DocSidebarItem';
import {
  SvgBug,
  SvgCodeFile,
  SvgCodeSquare,
  SvgFlame,
  SvgHome,
  SvgLightbulb,
  SvgNoteBook,
  SvgPanel,
  SvgQuestion,
  SvgArchitectureOverview, SvgWhy

} from '@site/src/components/svg';

const iconMap: Record<string, JSX.Element> = {
  Introduction: <SvgWhy />,
  ArchitectureOverview: <SvgArchitectureOverview />,
  ManagementPanel: <SvgPanel />,
  QuickStart: <SvgFlame />,
  FAQ: <SvgQuestion />,
  TestAndDebug: <SvgBug />,
  ExamplesAndPackages: <SvgLightbulb />,
  Home:<SvgHome />,
  'توسعه': <SvgCodeSquare />,
 "مثال‌ها و پکیج‌ها": <SvgCodeFile />,
};

export default function DocSidebarItem(props: Props) {
  const { item } = props;

  let icon: JSX.Element | null = null;

  if ('docId' in item && item.docId) {
    const docIdKey = item.docId.split('/').pop()!;
    icon = iconMap[docIdKey] || null;
  } else if (item.type === 'category' && item.label) {
    icon = iconMap[item.label] || null;
  }

  if (icon) {
    const labelWithIcon = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {icon}
        <span>{item.label}</span>
      </div>
    );

    const newProps = {
      ...props,
      item: {
        ...item,
        label: labelWithIcon,
      },
    };

    return <OriginalDocSidebarItem {...newProps} />;
  }

  return <OriginalDocSidebarItem {...props} />;
}
