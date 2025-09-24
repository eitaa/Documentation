import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'Home',
      label: 'خانه',
    },
    {
      type: 'doc',
      id: 'Introduction',
      label: 'چرا برنامه',
    },
    {
      type: 'doc',
      id: 'ArchitectureOverview',
      label: 'معماری کلی',
    },
    {
      type: 'doc',
      id: "QuickStart",
      label: 'شروع سریع',
    },
    {
      type: 'doc',
      id: "ManagementPanel",
      label: 'ثبت و مدیریت برنامه',
    },
    {
      type: 'category',
      label: 'توسعه',
      items: [

        {
          type: 'doc',
          id: 'Develop/JsSDK',
          label: 'کیت توسعه',
        },
        {
          type: 'doc',
          id: 'Develop/AuthorizationViaHash',
          label: 'احراز هویت hash',
        },
        {
          type: 'doc',
          id: 'Develop/ValidateHash',
          label: 'اصالت‌سنجی hash',
        },
        {
          type: 'doc',
          id: 'Develop/SendMassage',
          label: 'ارسال پیام به کاربر',
        },
      ],
    },
    // {
    //   type: 'category',
    //   label: 'مثال‌ها و پکیج‌ها',
    //   items: [
    //     {
    //       type: 'doc',
    //       id: 'ExamplesAndPackages/QuickExample',
    //       label: 'مثال سریع',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'ExamplesAndPackages/ComprehensiveExample',
    //       label: 'مثال جامع',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'ExamplesAndPackages/ToDoSampleNextJs',
    //       label: 'نمونه برنامه ToDo با Next.js',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'ExamplesAndPackages/FinanceSampleNextJs',
    //       label: 'نمونه برنامه مالی با Next.js',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'ExamplesAndPackages/FrontendIntegrationPackage',
    //       label: 'کتابخانه یکپارچه‌سازی فرانت‌اند',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'ExamplesAndPackages/WordpressPlugin',
    //       label: 'پلاگین وردپرس',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'ExamplesAndPackages/JoomlaPlugin',
    //       label: 'پلاگین جوملا',
    //     },
    //   ],
    // },
    {
      type: 'doc',
      id: "TestAndDebug",
      label: 'تست و دیباگ',
    },
    {
      type: 'doc',
      id: "FAQ",
      label: 'سوالات متدوال',
    },
  ],
};


export default sidebars;
