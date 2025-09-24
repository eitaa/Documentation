
#  کتابخانه یکپارچه‌سازی برنامک ایتا با فرانت‌اند

<a href="https://www.npmjs.com/package/eitaa-miniapp">
  <img src="https://img.shields.io/npm/v/eitaa-miniapp" class="no-zoom" alt="NPM Version" />
</a>
<a href="https://github.com/mstf-m/eitaa-miniapp">
  <img src="https://img.shields.io/badge/GitHub-View%20Source-blue?logo=github" class="no-zoom" alt="GitHub Repository" />
</a>

یک کتابخانه JavaScript/TypeScript برای یکپارچه‌سازی قابلیت‌های برنامک ایتا در پروژه‌های مدرن جاوااسکریپت. سازگار با React، Vue، Angular و JavaScript ساده.

## معرفی

کتابخانه `eitaa-miniapp` فرآیند اتصال به قابلیت‌های برنامک ایتا را در برنامه‌های تحت وب شما ساده می‌کند. این کتابخانه یک لایه API کامل فراهم می‌کند تا به راحتی به قابلیت‌هایی مانند تعامل با WebApp ایتا، مدیریت دکمه‌ها و دیگر امکانات دسترسی داشته باشید.

## ویژگی‌ها

- راه‌اندازی آسان: تنها با یک import به API برنامک ایتا دسترسی خواهید داشت.
- پیکربندی خودکار: با استفاده از فایل `miniapp.config.json` قابل سفارشی‌سازی است.
- کنترل پویا بر رابط کاربری: امکان تغییر دکمه‌ها، رنگ‌ها و ویژگی‌ها به‌صورت داینامیک.
- سازگاری کامل: قابل استفاده در React، Vue، Angular و جاوااسکریپت ساده.
- پشتیبانی از TypeScript: دارای تعریف کامل انواع برای تجربه‌ای روان در TypeScript.
- API جامع: دسترسی به متدهای WebApp و WebView برای تعاملات پیشرفته با برنامک.

## نصب

نصب پکیج از طریق NPM:

```bash title="bash"
npm install eitaa-miniapp
```

### راه‌اندازی اولیه پیکربندی

پس از نصب، برای راه‌اندازی تنظیمات اولیه، دستور زیر را اجرا کنید:

```bash title="bash"
npx miniapp-cli init
```

این دستور فایل **miniapp.config.json** را در دایرکتوری `public` در ریشه پروژه ایجاد می‌کند و به شما امکان تنظیم و شخصی‌سازی برنامک را می‌دهد.

## پیکربندی

فایل **miniapp.config.json** برای شخصی‌سازی مواردی مانند ظاهر دکمه‌ها، رنگ‌ها و قابلیت‌های فعال برنامک استفاده می‌شود.

### نمونه‌ای از فایل پیکربندی

```json title="json"
{
  "theme": {
    "bg_color": "#ffffff",
    "text_color": "#000000",
    "hint_color": "#888888",
    "link_color": "#1a73e8",
    "button_color": "#007bff",
    "button_text_color": "#ffffff",
    "secondary_bg_color": "#f8f9fa",
    "header_bg_color": "#f1f1f1",
    "bottom_bar_bg_color": "#eeeeee",
    "accent_text_color": "#ff5733",
    "section_bg_color": "#f5f5f5",
    "section_header_text_color": "#333333",
    "section_separator_color": "#dcdcdc",
    "subtitle_text_color": "#666666",
    "destructive_text_color": "#ff0000"
  },
  "buttons": {
    "mainButton": {
      "text": "Start",
      "color": "#007bff",
      "textColor": "#ffffff",
      "isVisible": true,
      "isActive": true,
      "hasShineEffect": false,
      "position": "bottom",
      "isProgressVisible": false
    },
    "secondaryButton": {
      "text": "Cancel",
      "color": "#6c757d",
      "textColor": "#ffffff",
      "isVisible": false,
      "isActive": true,
      "hasShineEffect": false,
      "position": "bottom",
      "isProgressVisible": false
    },
    "backButton": {
      "isVisible": true
    },
    "settingsButton": {
      "isVisible": false
    }
  },
  "hapticFeedback": {
    "enabled": true
  },
  "features": {
    "biometric_auth": true,
    "cloud_storage": true,
    "qr_scanner": true
  }
}
```

## استفاده

### راه‌اندازی پایه

وارد کردن کتابخانه و استفاده مستقیم از `EitaaMiniApp`:

```ts title="ts"
import { EitaaMiniApp } from "eitaa-miniapp";

// مثال: دریافت داده‌های اولیه کاربر
console.log(EitaaMiniApp.WebApp.initData);
```

### مثال در یک کامپوننت React

```tsx title="tsx"
import React from "react";
import { EitaaMiniApp } from "eitaa-miniapp";

const App = () => {
  const userData = EitaaMiniApp.WebApp.initData;

  const handleMainButtonClick = () => {
    EitaaMiniApp.WebApp.MainButton.setParams({ text: "Clicked!" });
  };

  return (
    <div>
      <h1>داده کاربر: {userData}</h1>
      <button onClick={handleMainButtonClick}>کلیک کن</button>
    </div>
  );
};

export default App;
```

### مثال در یک کامپوننت Vue

```tsx title="tsx"
<template>
  <div>
    <h1>داده کاربر: {{ userData }}</h1>
    <button @click="handleButtonClick">کلیک کن</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { EitaaMiniApp } from "eitaa-miniapp";

export default defineComponent({
  name: "EitaaComponent",
  setup() {
    const userData = ref(EitaaMiniApp.WebApp.initData);

    const handleButtonClick = () => {
      EitaaMiniApp.WebApp.MainButton.setParams({ text: "Clicked!" });
    };

    return { userData, handleButtonClick };
  }
});
</script>
```

### مثال در JavaScript ساده

```html title="html"
<!DOCTYPE html>
<html lang="fa">
  <head>
    <meta charset="UTF-8" />
    <title>مثال برنامک ایتا</title>
  </head>
  <body>
    <h1 id="userData">داده کاربر:</h1>
    <button id="actionButton">کلیک کن</button>

    <script type="module">
      import { EitaaMiniApp } from "./node_modules/eitaa-miniapp/dist/index.mjs";

      document.getElementById("userData").innerText =
        EitaaMiniApp.WebApp.initData;

      document.getElementById("actionButton").onclick = () => {
        EitaaMiniApp.WebApp.MainButton.setParams({ text: "Clicked!" });
      };
    </script>
  </body>
</html>
```

## مرجع API

### EitaaMiniApp.WebApp

- `initData`: داده خام منتقل‌شده به برنامک در هنگام بارگذاری.
- `initDataUnsafe`: داده تجزیه‌شده شامل اطلاعات کاربر مانند `user.id`, `user.username` و ...
- `MainButton`: کنترل دکمه اصلی پایین برنامک.
  - `enable()`: فعال‌سازی دکمه.
  - `disable()`: غیرفعال‌سازی دکمه.
  - `show()`: نمایش دکمه.
  - `setParams(params)`: تعیین ویژگی‌هایی مثل `text`، `color`، `text_color`.
- `BackButton`: کنترل دکمه بازگشت.
  - `show()`: نمایش دکمه بازگشت.
  - `hide()`: مخفی کردن دکمه بازگشت.
- `SettingsButton`: کنترل دکمه تنظیمات.
  - `show()`: نمایش دکمه تنظیمات.
  - `hide()`: مخفی کردن دکمه تنظیمات.
- `setBackgroundColor(color)`: تنظیم رنگ پس‌زمینه برنامک.
- `setHeaderColor(color)`: تنظیم رنگ نوار بالای برنامک.
- `setBottomBarColor(color)`: تنظیم رنگ نوار پایین برنامک.
- `showPopup(params)`: نمایش یک پاپ‌آپ با عنوان، پیام و دکمه‌های دلخواه.

## سازگاری

- React: نسخه 16.8.0 به بالا
- Vue: نسخه 2.6.0 به بالا
- Angular: نسخه 9.0.0 به بالا
- JavaScript: سازگار با محیط‌های مدرن (ES6+) و کلاسیک (ES5)

## مشارکت

ما از مشارکت استقبال می‌کنیم! در صورت تمایل می‌توانید اشکالات، درخواست‌های تغییر یا ویژگی‌های جدید را ثبت یا Pull Request ارسال کنید. برای تغییرات بزرگ، لطفاً ابتدا در بخش Issues بحث آغاز کنید.