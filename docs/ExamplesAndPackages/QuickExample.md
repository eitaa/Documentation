# مثال سریع مینی‌اپ

این مثال سریع شامل مهم‌ترین بخش‌های توسعه مینی‌اپ ایتا است و برای شروع سریع طراحی شده است.

---

## مقدمه

این مثال شامل:
- راه‌اندازی اولیه مینی‌اپ
- تشخیص محیط اجرا
- استفاده از APIهای اصلی
- تعامل ساده با کاربر

---

## ساختار پروژه

```
quick-mini-app/
├── index.html
├── styles.css
└── app.js
```

---

## 1. فایل HTML اصلی

```html title="html"
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مینی‌اپ سریع ایتا</title>
    
    <!-- اتصال اسکریپت ایتا -->
    <script src="https://developer.eitaa.com/eitaa-web-app.js"></script>
    
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <div id="loading">در حال بارگذاری...</div>
        
        <div id="main-content" style="display: none;">
            <header id="app-header">
                <h1>مینی‌اپ سریع</h1>
                <div id="user-info"></div>
            </header>
            
            <main id="app-main">
                <div class="feature-group">
                    <h3>دکمه‌های اصلی</h3>
                    <button id="main-button-toggle">نمایش/مخفی دکمه اصلی</button>
                    <button id="back-button-toggle">نمایش/مخفی دکمه برگشت</button>
                </div>
                
                <div class="feature-group">
                    <h3>تعامل با کاربر</h3>
                    <button id="alert-button">نمایش هشدار</button>
                    <button id="confirm-button">نمایش تأیید</button>
                    <button id="popup-button">نمایش پاپ‌آپ</button>
                </div>
                
                <div class="feature-group">
                    <h3>تنظیمات مینی‌اپ</h3>
                    <button id="expand-button">گسترش مینی‌اپ</button>
                    <button id="theme-button">تغییر رنگ هدر</button>
                </div>
                
                <div class="feature-group">
                    <h3>درخواست اطلاعات</h3>
                    <button id="contact-button">درخواست شماره تماس</button>
                    <button id="write-access-button">درخواست مجوز نوشتن</button>
                </div>
            </main>
        </div>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

---

## 2. فایل CSS

```css title="css"
:root {
    --tg-theme-bg-color: #ffffff;
    --tg-theme-text-color: #000000;
    --tg-theme-hint-color: #999999;
    --tg-theme-button-color: #2481cc;
    --tg-theme-button-text-color: #ffffff;
    --tg-theme-secondary-bg-color: #f1f1f1;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
    line-height: 1.6;
}

#app {
    min-height: 100vh;
    padding: 20px;
}

#loading {
    text-align: center;
    padding: 50px;
    font-size: 18px;
    color: var(--tg-theme-hint-color);
}

#app-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background-color: var(--tg-theme-secondary-bg-color);
    border-radius: 10px;
}

#user-info {
    margin-top: 10px;
    font-size: 14px;
    color: var(--tg-theme-hint-color);
}

.feature-group {
    margin-bottom: 30px;
    padding: 20px;
    background-color: var(--tg-theme-secondary-bg-color);
    border-radius: 10px;
}

.feature-group h3 {
    margin-bottom: 15px;
    color: var(--tg-theme-text-color);
}

button {
    background-color: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    font-size: 14px;
    transition: opacity 0.2s;
}

button:hover {
    opacity: 0.8;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

---

## 3. فایل JavaScript اصلی

```javascript title="javascript"
class QuickEitaaApp {
    constructor() {
        this.webApp = null;
        this.init();
    }

    // راه‌اندازی اولیه
    init() {
        console.log('شروع راه‌اندازی مینی‌اپ...');
        
        // بررسی وجود API ایتا
        if (typeof window.Eitaa !== 'undefined' && window.Eitaa.WebApp) {
            this.webApp = window.Eitaa.WebApp;
            console.log('API ایتا یافت شد');
            this.setupMiniApp();
        } else {
            console.log('API ایتا یافت نشد - اجرا در حالت وب');
            this.setupWebMode();
        }
    }

    // راه‌اندازی مینی‌اپ
    setupMiniApp() {
        console.log('راه‌اندازی مینی‌اپ...');
        
        // تنظیمات اولیه
        this.webApp.ready();
        this.webApp.expand();
        this.webApp.enableClosingConfirmation();
        
        // تنظیم تم
        this.setupTheme();
        
        // دریافت اطلاعات کاربر
        this.getUserInfo();
        
        // تنظیم رویدادها
        this.setupEventListeners();
        
        // نمایش محتوا
        this.showMainContent();
    }

    // راه‌اندازی حالت وب
    setupWebMode() {
        console.log('راه‌اندازی حالت وب...');
        this.showMainContent();
        this.setupWebEventListeners();
    }

    // تنظیم تم
    setupTheme() {
        if (this.webApp && this.webApp.themeParams) {
            const theme = this.webApp.themeParams;
            console.log('تنظیم تم:', theme);
            
            // اعمال رنگ‌های تم
            document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color || '#ffffff');
            document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color || '#000000');
            document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color || '#2481cc');
            document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color || '#ffffff');
        }
    }

    // دریافت اطلاعات کاربر
    getUserInfo() {
        if (this.webApp && this.webApp.initDataUnsafe && this.webApp.initDataUnsafe.user) {
            const userData = this.webApp.initDataUnsafe.user;
            this.displayUserInfo(userData);
            console.log('اطلاعات کاربر:', userData);
        }
    }

    // نمایش اطلاعات کاربر
    displayUserInfo(userData) {
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement && userData) {
            const fullName = `${userData.first_name} ${userData.last_name || ''}`.trim();
            userInfoElement.textContent = `کاربر: ${fullName} (ID: ${userData.id})`;
        }
    }

    // تنظیم رویدادها
    setupEventListeners() {
        // رویدادهای مینی‌اپ
        if (this.webApp) {
            this.webApp.onEvent('themeChanged', () => {
                console.log('تم تغییر کرد');
                this.setupTheme();
            });

            this.webApp.onEvent('mainButtonClicked', () => {
                console.log('دکمه اصلی کلیک شد');
                this.showAlert('دکمه اصلی کلیک شد!');
            });

            this.webApp.onEvent('backButtonClicked', () => {
                console.log('دکمه برگشت کلیک شد');
                this.webApp.close();
            });
        }

        // رویدادهای دکمه‌ها
        this.setupButtonEventListeners();
    }

    // تنظیم رویدادهای دکمه‌ها
    setupButtonEventListeners() {
        // دکمه‌های اصلی
        document.getElementById('main-button-toggle')?.addEventListener('click', () => {
            this.toggleMainButton();
        });

        document.getElementById('back-button-toggle')?.addEventListener('click', () => {
            this.toggleBackButton();
        });

        // دکمه‌های تعامل
        document.getElementById('alert-button')?.addEventListener('click', () => {
            this.showAlert('این یک پیام هشدار است!');
        });

        document.getElementById('confirm-button')?.addEventListener('click', () => {
            this.showConfirm();
        });

        document.getElementById('popup-button')?.addEventListener('click', () => {
            this.showPopup();
        });

        // دکمه‌های تنظیمات
        document.getElementById('expand-button')?.addEventListener('click', () => {
            this.expandMiniApp();
        });

        document.getElementById('theme-button')?.addEventListener('click', () => {
            this.changeHeaderColor();
        });

        // دکمه‌های درخواست اطلاعات
        document.getElementById('contact-button')?.addEventListener('click', () => {
            this.requestContact();
        });

        document.getElementById('write-access-button')?.addEventListener('click', () => {
            this.requestWriteAccess();
        });
    }

    // تنظیم رویدادهای حالت وب
    setupWebEventListeners() {
        // در حالت وب، برخی قابلیت‌ها غیرفعال هستند
        const webOnlyButtons = ['contact-button', 'write-access-button'];
        webOnlyButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.disabled = true;
                button.title = 'این قابلیت فقط در مینی‌اپ ایتا در دسترس است';
            }
        });
    }

    // نمایش محتوای اصلی
    showMainContent() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }

    // کنترل دکمه اصلی
    toggleMainButton() {
        if (!this.webApp) return;

        if (this.webApp.MainButton.isVisible) {
            this.webApp.MainButton.hide();
            this.showAlert('دکمه اصلی مخفی شد');
        } else {
            this.webApp.MainButton.setText('دکمه اصلی');
            this.webApp.MainButton.show();
            this.showAlert('دکمه اصلی نمایش داده شد');
        }
    }

    // کنترل دکمه برگشت
    toggleBackButton() {
        if (!this.webApp) return;

        if (this.webApp.BackButton.isVisible) {
            this.webApp.BackButton.hide();
            this.showAlert('دکمه برگشت مخفی شد');
        } else {
            this.webApp.BackButton.show();
            this.showAlert('دکمه برگشت نمایش داده شد');
        }
    }

    // گسترش مینی‌اپ
    expandMiniApp() {
        if (this.webApp) {
            this.webApp.expand();
            this.showAlert('مینی‌اپ گسترش یافت');
        }
    }

    // تغییر رنگ هدر
    changeHeaderColor() {
        if (this.webApp) {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.webApp.setHeaderColor(randomColor);
            this.showAlert(`رنگ هدر به ${randomColor} تغییر کرد`);
        }
    }

    // نمایش پاپ‌آپ
    showPopup() {
        if (this.webApp) {
            this.webApp.showPopup({
                title: 'پاپ‌آپ نمونه',
                message: 'این یک پاپ‌آپ نمونه است.',
                buttons: [
                    { id: 'ok', type: 'ok', text: 'تأیید' },
                    { id: 'cancel', type: 'cancel', text: 'لغو' }
                ]
            }, (buttonId) => {
                this.showAlert(`دکمه ${buttonId} کلیک شد`);
            });
        }
    }

    // نمایش هشدار
    showAlert(message) {
        if (this.webApp) {
            this.webApp.showAlert(message);
        } else {
            alert(message);
        }
    }

    // نمایش تأیید
    showConfirm() {
        if (this.webApp) {
            this.webApp.showConfirm('آیا مطمئن هستید؟', (confirmed) => {
                if (confirmed) {
                    this.showAlert('کاربر تأیید کرد');
                } else {
                    this.showAlert('کاربر لغو کرد');
                }
            });
        } else {
            const confirmed = confirm('آیا مطمئن هستید؟');
            this.showAlert(confirmed ? 'کاربر تأیید کرد' : 'کاربر لغو کرد');
        }
    }

    // درخواست شماره تماس
    requestContact() {
        if (this.webApp) {
            this.webApp.requestContact((success, contactData) => {
                if (success) {
                    this.showAlert('شماره تماس دریافت شد');
                    console.log('داده‌های تماس:', contactData);
                } else {
                    this.showAlert('درخواست شماره تماس لغو شد');
                }
            });
        }
    }

    // درخواست مجوز نوشتن
    requestWriteAccess() {
        if (this.webApp) {
            this.webApp.requestWriteAccess((granted) => {
                if (granted) {
                    this.showAlert('مجوز نوشتن اعطا شد');
                } else {
                    this.showAlert('مجوز نوشتن رد شد');
                }
            });
        }
    }
}

// راه‌اندازی مینی‌اپ پس از بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    new QuickEitaaApp();
});
```

---

## 4. راهنمای استفاده

### نصب و راه‌اندازی

1. **ایجاد فایل‌ها:**
   - فایل‌های `index.html`، `styles.css` و `app.js` را در یک پوشه ایجاد کنید

2. **اجرای مینی‌اپ:**
   - فایل‌ها را روی یک سرور HTTPS بارگذاری کنید
   - یا از یک سرور محلی استفاده کنید

3. **تست:**
   - در مرورگر: آدرس فایل را باز کنید
   - در ایتا: مینی‌اپ را در ایتا باز کنید

### ویژگی‌های کلیدی

- **تشخیص محیط:** خودکار تشخیص می‌دهد که در ایتا اجرا می‌شود یا مرورگر
- **دکمه‌های اصلی:** کنترل دکمه اصلی و برگشت
- **تعامل کاربر:** هشدار، تأیید و پاپ‌آپ
- **تنظیمات:** گسترش مینی‌اپ و تغییر رنگ
- **درخواست اطلاعات:** شماره تماس و مجوز نوشتن

### نکات مهم

- **HTTPS ضروری:** مینی‌اپ باید روی HTTPS اجرا شود
- **اسکریپت ایتا:** حتماً در `<head>` بارگذاری شود
- **آمادگی:** از `ready()` برای اعلام آمادگی استفاده کنید
- **خطاها:** همیشه خطاها را مدیریت کنید

---

## 5. عیب‌یابی

### مشکلات رایج

1. **خطای "API ایتا یافت نشد":**
   - مطمئن شوید که اسکریپت ایتا بارگذاری شده
   - بررسی کنید که در محیط ایتا اجرا می‌شود

2. **دکمه‌ها کار نمی‌کنند:**
   - مطمئن شوید که در محیط ایتا اجرا می‌شود
   - بررسی کنید که `ready()` فراخوانی شده

3. **رنگ‌ها اعمال نمی‌شوند:**
   - بررسی کنید که `themeParams` موجود است
   - مطمئن شوید که CSS متغیرها تعریف شده‌اند

### لاگ‌گیری

برای عیب‌یابی، کنسول مرورگر را بررسی کنید:

```javascript
// بررسی API ایتا
console.log('WebApp:', window.Eitaa?.WebApp);

// بررسی اطلاعات کاربر
console.log('User:', window.Eitaa?.WebApp?.initDataUnsafe?.user);
```

---

این مثال سریع شامل مهم‌ترین قابلیت‌های مینی‌اپ ایتا است و می‌تواند به عنوان نقطه شروع برای پروژه‌های شما استفاده شود. 