# مثال جامع توسعه مینی‌اپ

این مثال جامع تمام جنبه‌های مهم توسعه مینی‌اپ ایتا را پوشش می‌دهد و شامل راه‌اندازی اولیه، احراز هویت، اعتبارسنجی و استفاده از APIهای اصلی است.

---

## مقدمه

این مثال یک مینی‌اپ کامل را نشان می‌دهد که شامل:
- راه‌اندازی اولیه و تشخیص محیط اجرا
- احراز هویت با استفاده از hash
- اعتبارسنجی داده‌ها در سرور
- استفاده از APIهای اصلی Bridge
- مدیریت رویدادها و تعامل با کاربر

---

## ساختار پروژه

```
mini-app-example/
├── public/
│   ├── index.html
│   └── styles.css
├── server/
│   ├── server.js
│   ├── auth.js
│   └── package.json
└── README.md
```

---

## 1. راه‌اندازی اولیه مینی‌اپ

### HTML اصلی (public/index.html)

```html title="html"
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مینی‌اپ نمونه ایتا</title>
    
    <!-- اتصال اسکریپت ایتا - حتماً در head قرار دهید -->
    <script src="https://developer.eitaa.com/eitaa-web-app.js"></script>
    
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <div id="loading">در حال بارگذاری...</div>
        
        <div id="main-content" style="display: none;">
            <header id="app-header">
                <h1>مینی‌اپ نمونه</h1>
                <div id="user-info"></div>
            </header>
            
            <main id="app-main">
                <div id="auth-section">
                    <h2>احراز هویت</h2>
                    <div id="auth-status">در حال بررسی...</div>
                    <button id="auth-button" style="display: none;">تأیید هویت</button>
                </div>
                
                <div id="features-section" style="display: none;">
                    <h2>قابلیت‌های مینی‌اپ</h2>
                    
                    <div class="feature-group">
                        <h3>دکمه‌های اصلی</h3>
                        <button id="main-button-toggle">نمایش/مخفی دکمه اصلی</button>
                        <button id="back-button-toggle">نمایش/مخفی دکمه برگشت</button>
                    </div>
                    
                    <div class="feature-group">
                        <h3>رنگ‌ها و تم</h3>
                        <button id="expand-button">گسترش مینی‌اپ</button>
                        <button id="theme-button">تغییر رنگ هدر</button>
                    </div>
                    
                    <div class="feature-group">
                        <h3>تعامل با کاربر</h3>
                        <button id="popup-button">نمایش پاپ‌آپ</button>
                        <button id="alert-button">نمایش هشدار</button>
                        <button id="confirm-button">نمایش تأیید</button>
                    </div>
                    
                    <div class="feature-group">
                        <h3>درخواست اطلاعات</h3>
                        <button id="contact-button">درخواست شماره تماس</button>
                        <button id="write-access-button">درخواست مجوز نوشتن</button>
                    </div>
                    
                    <div class="feature-group">
                        <h3>سنسورها</h3>
                        <button id="accelerometer-button">شروع شتاب‌سنج</button>
                        <button id="gyroscope-button">شروع ژیروسکوپ</button>
                        <div id="sensor-data"></div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

### CSS استایل‌ها (public/styles.css)

```css title="css"
:root {
    --tg-theme-bg-color: #ffffff;
    --tg-theme-text-color: #000000;
    --tg-theme-hint-color: #999999;
    --tg-theme-link-color: #2481cc;
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

#sensor-data {
    margin-top: 15px;
    padding: 10px;
    background-color: var(--tg-theme-bg-color);
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
}

.status-success {
    color: #28a745;
}

.status-error {
    color: #dc3545;
}

.status-warning {
    color: #ffc107;
}
```

---

## 2. کد اصلی مینی‌اپ (public/app.js)

```javascript title="javascript"
class EitaaMiniApp {
    constructor() {
        this.webApp = null;
        this.isAuthenticated = false;
        this.userData = null;
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
        
        // تنظیمات اولیه مینی‌اپ
        this.webApp.ready();
        this.webApp.expand();
        this.webApp.enableClosingConfirmation();
        
        // تنظیم رنگ‌ها
        this.setupTheme();
        
        // دریافت اطلاعات کاربر
        this.getUserInfo();
        
        // احراز هویت
        this.authenticate();
        
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
            
            // اعمال رنگ‌های تم به CSS
            document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color || '#ffffff');
            document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color || '#000000');
            document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color || '#2481cc');
            document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color || '#ffffff');
        }
    }

    // دریافت اطلاعات کاربر
    getUserInfo() {
        if (this.webApp && this.webApp.initDataUnsafe && this.webApp.initDataUnsafe.user) {
            this.userData = this.webApp.initDataUnsafe.user;
            this.displayUserInfo();
            console.log('اطلاعات کاربر:', this.userData);
        }
    }

    // نمایش اطلاعات کاربر
    displayUserInfo() {
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement && this.userData) {
            const fullName = `${this.userData.first_name} ${this.userData.last_name || ''}`.trim();
            userInfoElement.textContent = `کاربر: ${fullName} (ID: ${this.userData.id})`;
        }
    }

    // احراز هویت
    async authenticate() {
        if (!this.webApp || !this.webApp.initData) {
            this.updateAuthStatus('خطا: داده‌های اولیه در دسترس نیست', 'error');
            return;
        }

        try {
            this.updateAuthStatus('در حال احراز هویت...', 'warning');
            
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initData: this.webApp.initData,
                    userAgent: navigator.userAgent,
                    timestamp: Date.now()
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.isAuthenticated = true;
                this.updateAuthStatus('احراز هویت موفق', 'success');
                this.showFeatures();
            } else {
                this.updateAuthStatus(`خطای احراز هویت: ${result.error}`, 'error');
            }
        } catch (error) {
            console.error('خطا در احراز هویت:', error);
            this.updateAuthStatus('خطا در ارتباط با سرور', 'error');
        }
    }

    // به‌روزرسانی وضعیت احراز هویت
    updateAuthStatus(message, type) {
        const statusElement = document.getElementById('auth-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status-${type}`;
        }
    }

    // نمایش قابلیت‌ها
    showFeatures() {
        const featuresSection = document.getElementById('features-section');
        if (featuresSection) {
            featuresSection.style.display = 'block';
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

            this.webApp.onEvent('viewportChanged', (event) => {
                console.log('نمایش تغییر کرد:', event);
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

        // دکمه‌های رنگ و تم
        document.getElementById('expand-button')?.addEventListener('click', () => {
            this.expandMiniApp();
        });

        document.getElementById('theme-button')?.addEventListener('click', () => {
            this.changeHeaderColor();
        });

        // دکمه‌های تعامل
        document.getElementById('popup-button')?.addEventListener('click', () => {
            this.showPopup();
        });

        document.getElementById('alert-button')?.addEventListener('click', () => {
            this.showAlert('این یک پیام هشدار است!');
        });

        document.getElementById('confirm-button')?.addEventListener('click', () => {
            this.showConfirm();
        });

        // دکمه‌های درخواست اطلاعات
        document.getElementById('contact-button')?.addEventListener('click', () => {
            this.requestContact();
        });

        document.getElementById('write-access-button')?.addEventListener('click', () => {
            this.requestWriteAccess();
        });

        // دکمه‌های سنسور
        document.getElementById('accelerometer-button')?.addEventListener('click', () => {
            this.toggleAccelerometer();
        });

        document.getElementById('gyroscope-button')?.addEventListener('click', () => {
            this.toggleGyroscope();
        });
    }

    // تنظیم رویدادهای حالت وب
    setupWebEventListeners() {
        // در حالت وب، برخی قابلیت‌ها غیرفعال هستند
        const webOnlyButtons = ['contact-button', 'write-access-button', 'accelerometer-button', 'gyroscope-button'];
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
                message: 'این یک پاپ‌آپ نمونه است که می‌تواند شامل دکمه‌های مختلف باشد.',
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
            this.webApp.showConfirm('آیا مطمئن هستید که می‌خواهید این کار را انجام دهید؟', (confirmed) => {
                if (confirmed) {
                    this.showAlert('کاربر تأیید کرد');
                } else {
                    this.showAlert('کاربر لغو کرد');
                }
            });
        } else {
            const confirmed = confirm('آیا مطمئن هستید که می‌خواهید این کار را انجام دهید؟');
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

    // کنترل شتاب‌سنج
    toggleAccelerometer() {
        if (!this.webApp || !this.webApp.Accelerometer) return;

        const button = document.getElementById('accelerometer-button');
        const sensorData = document.getElementById('sensor-data');

        if (this.webApp.Accelerometer.isStarted) {
            this.webApp.Accelerometer.stop((success) => {
                if (success) {
                    button.textContent = 'شروع شتاب‌سنج';
                    sensorData.innerHTML = 'شتاب‌سنج متوقف شد';
                }
            });
        } else {
            this.webApp.Accelerometer.start({ refresh_rate: 100 }, (success) => {
                if (success) {
                    button.textContent = 'توقف شتاب‌سنج';
                    this.startSensorMonitoring('accelerometer');
                }
            });
        }
    }

    // کنترل ژیروسکوپ
    toggleGyroscope() {
        if (!this.webApp || !this.webApp.Gyroscope) return;

        const button = document.getElementById('gyroscope-button');
        const sensorData = document.getElementById('sensor-data');

        if (this.webApp.Gyroscope.isStarted) {
            this.webApp.Gyroscope.stop((success) => {
                if (success) {
                    button.textContent = 'شروع ژیروسکوپ';
                    sensorData.innerHTML = 'ژیروسکوپ متوقف شد';
                }
            });
        } else {
            this.webApp.Gyroscope.start({ refresh_rate: 100 }, (success) => {
                if (success) {
                    button.textContent = 'توقف ژیروسکوپ';
                    this.startSensorMonitoring('gyroscope');
                }
            });
        }
    }

    // نظارت بر سنسورها
    startSensorMonitoring(sensorType) {
        const sensorData = document.getElementById('sensor-data');
        
        const updateSensorData = () => {
            if (!this.webApp) return;

            let data = '';
            if (sensorType === 'accelerometer' && this.webApp.Accelerometer) {
                const acc = this.webApp.Accelerometer;
                data = `شتاب‌سنج: X=${acc.x?.toFixed(2) || 0}, Y=${acc.y?.toFixed(2) || 0}, Z=${acc.z?.toFixed(2) || 0}`;
            } else if (sensorType === 'gyroscope' && this.webApp.Gyroscope) {
                const gyro = this.webApp.Gyroscope;
                data = `ژیروسکوپ: X=${gyro.x?.toFixed(2) || 0}, Y=${gyro.y?.toFixed(2) || 0}, Z=${gyro.z?.toFixed(2) || 0}`;
            }

            if (data) {
                sensorData.innerHTML = data;
            }
        };

        // به‌روزرسانی هر 100 میلی‌ثانیه
        this.sensorInterval = setInterval(updateSensorData, 100);
    }
}

// راه‌اندازی مینی‌اپ پس از بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    new EitaaMiniApp();
});
```

---

## 3. سرور احراز هویت (server/server.js)

```javascript title="javascript"
const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// تنظیمات
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // توکن ربات خود را اینجا قرار دهید
const WEBAPP_URL = 'https://your-domain.com'; // آدرس مینی‌اپ خود را اینجا قرار دهید

// میدلورها
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// کلاس احراز هویت
class EitaaAuth {
    constructor(botToken) {
        this.botToken = botToken;
    }

    // اعتبارسنجی داده‌های اولیه
    validateInitData(initData) {
        try {
            const urlParams = new URLSearchParams(initData);
            const hash = urlParams.get('hash');
            
            if (!hash) {
                return { valid: false, error: 'Hash not found' };
            }

            // حذف hash از پارامترها
            urlParams.delete('hash');

            // مرتب‌سازی پارامترها
            const pairs = [];
            for (const [key, value] of urlParams.entries()) {
                pairs.push(`${key}=${value}`);
            }
            pairs.sort();

            // اتصال پارامترها
            const dataCheckString = pairs.join('\n');

            // ایجاد HMAC با WebAppData
            const secretKey = crypto.createHmac('sha256', 'WebAppData').update(this.botToken).digest();
            
            // ایجاد HMAC نهایی
            const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

            // مقایسه hash
            const isValid = calculatedHash === hash;

            return {
                valid: isValid,
                error: isValid ? null : 'Hash validation failed',
                data: isValid ? Object.fromEntries(urlParams) : null
            };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }

    // اعتبارسنجی با سرور ایتا
    async verifyWithEitaaServer(hash, userIP) {
        try {
            const response = await axios.post('https://eitaayar.ir/api/app/verify', {
                token: this.botToken,
                hash: hash,
                ip: userIP
            });

            return {
                valid: response.data.ok === true,
                error: response.data.ok === false ? 'Server verification failed' : null
            };
        } catch (error) {
            return {
                valid: false,
                error: `Server verification error: ${error.message}`
            };
        }
    }

    // بررسی تاریخ انقضا
    checkExpiration(authDate) {
        const currentTime = Math.floor(Date.now() / 1000);
        const authTime = parseInt(authDate);
        const timeDiff = currentTime - authTime;
        
        // بررسی انقضا (1 ساعت)
        const maxAge = 3600;
        
        return {
            valid: timeDiff <= maxAge,
            error: timeDiff > maxAge ? 'Data expired' : null,
            timeDiff: timeDiff
        };
    }
}

// ایجاد نمونه احراز هویت
const auth = new EitaaAuth(BOT_TOKEN);

// مسیر احراز هویت
app.post('/api/verify', async (req, res) => {
    try {
        const { initData, userAgent, timestamp } = req.body;
        const userIP = req.ip || req.connection.remoteAddress;

        console.log('درخواست احراز هویت:', {
            userIP,
            userAgent,
            timestamp
        });

        // بررسی وجود داده‌های اولیه
        if (!initData) {
            return res.status(400).json({
                success: false,
                error: 'Init data is required'
            });
        }

        // اعتبارسنجی داده‌های اولیه
        const validationResult = auth.validateInitData(initData);
        
        if (!validationResult.valid) {
            console.log('خطا در اعتبارسنجی:', validationResult.error);
            return res.status(401).json({
                success: false,
                error: validationResult.error
            });
        }

        // بررسی تاریخ انقضا
        if (validationResult.data && validationResult.data.auth_date) {
            const expirationCheck = auth.checkExpiration(validationResult.data.auth_date);
            
            if (!expirationCheck.valid) {
                console.log('خطا در تاریخ انقضا:', expirationCheck.error);
                return res.status(401).json({
                    success: false,
                    error: expirationCheck.error
                });
            }
        }

        // اعتبارسنجی با سرور ایتا (اختیاری)
        if (validationResult.data && validationResult.data.hash) {
            const serverVerification = await auth.verifyWithEitaaServer(
                validationResult.data.hash,
                userIP
            );

            if (!serverVerification.valid) {
                console.log('خطا در اعتبارسنجی سرور:', serverVerification.error);
                // در اینجا می‌توانید تصمیم بگیرید که آیا خطا را برگردانید یا خیر
                // return res.status(401).json({
                //     success: false,
                //     error: serverVerification.error
                // });
            }
        }

        // احراز هویت موفق
        console.log('احراز هویت موفق برای کاربر:', validationResult.data?.user);
        
        res.json({
            success: true,
            user: validationResult.data?.user,
            chat: validationResult.data?.chat_type,
            timestamp: Date.now()
        });

    } catch (error) {
        console.error('خطا در احراز هویت:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// مسیر اطلاعات مینی‌اپ
app.get('/api/info', (req, res) => {
    res.json({
        name: 'مینی‌اپ نمونه ایتا',
        version: '1.0.0',
        description: 'یک مینی‌اپ جامع برای نمایش قابلیت‌های ایتا',
        features: [
            'احراز هویت امن',
            'API Bridge کامل',
            'سنسورها',
            'تعامل با کاربر',
            'مدیریت تم'
        ]
    });
});

// مسیر سلامت سرور
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: Date.now(),
        uptime: process.uptime()
    });
});

// مدیریت خطاها
app.use((err, req, res, next) => {
    console.error('خطای سرور:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// راه‌اندازی سرور
app.listen(PORT, () => {
    console.log(`سرور در پورت ${PORT} راه‌اندازی شد`);
    console.log(`مینی‌اپ در آدرس: ${WEBAPP_URL}`);
    console.log(`API سلامت: ${WEBAPP_URL}/api/health`);
});

module.exports = app;
```

---

## 4. فایل package.json سرور

```json title="json"
{
  "name": "eitaa-mini-app-example",
  "version": "1.0.0",
  "description": "مثال جامع مینی‌اپ ایتا",
  "main": "server/server.js",
  "scripts": {
    "start": "node server/server.js",
    "dev": "nodemon server/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "eitaa",
    "mini-app",
    "telegram",
    "web-app",
    "javascript"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "crypto": "^1.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

---

## 5. فایل احراز هویت جداگانه (server/auth.js)

```javascript title="javascript"
const crypto = require('crypto');

class EitaaHashValidator {
    constructor(botToken) {
        this.botToken = botToken;
    }

    // اعتبارسنجی کامل داده‌های اولیه
    validateInitData(initData) {
        try {
            // تجزیه پارامترها
            const urlParams = new URLSearchParams(initData);
            const hash = urlParams.get('hash');
            
            if (!hash) {
                return { valid: false, error: 'Hash parameter not found' };
            }

            // حذف hash از پارامترها
            urlParams.delete('hash');

            // ایجاد آرایه از جفت‌های کلید-مقدار
            const pairs = [];
            for (const [key, value] of urlParams.entries()) {
                pairs.push(`${key}=${value}`);
            }

            // مرتب‌سازی بر اساس حروف الفبا
            pairs.sort();

            // اتصال پارامترها با خط شکست
            const dataCheckString = pairs.join('\n');

            // مرحله 1: ایجاد HMAC با WebAppData
            const secretKey = crypto.createHmac('sha256', 'WebAppData')
                .update(this.botToken)
                .digest();

            // مرحله 2: ایجاد HMAC نهایی
            const calculatedHash = crypto.createHmac('sha256', secretKey)
                .update(dataCheckString)
                .digest('hex');

            // مقایسه hash
            const isValid = calculatedHash === hash;

            return {
                valid: isValid,
                error: isValid ? null : 'Hash validation failed',
                data: isValid ? Object.fromEntries(urlParams) : null,
                calculatedHash,
                receivedHash: hash,
                dataCheckString
            };
        } catch (error) {
            return { 
                valid: false, 
                error: `Validation error: ${error.message}` 
            };
        }
    }

    // بررسی تاریخ انقضا
    checkExpiration(authDate, maxAgeSeconds = 3600) {
        try {
            const currentTime = Math.floor(Date.now() / 1000);
            const authTime = parseInt(authDate);
            
            if (isNaN(authTime)) {
                return { valid: false, error: 'Invalid auth_date format' };
            }

            const timeDiff = currentTime - authTime;
            const isValid = timeDiff <= maxAgeSeconds;

            return {
                valid: isValid,
                error: isValid ? null : `Data expired (${timeDiff}s > ${maxAgeSeconds}s)`,
                timeDiff,
                maxAge: maxAgeSeconds
            };
        } catch (error) {
            return { valid: false, error: `Expiration check error: ${error.message}` };
        }
    }

    // اعتبارسنجی کامل با تمام بررسی‌ها
    validateComplete(initData, userIP = null) {
        const validation = this.validateInitData(initData);
        
        if (!validation.valid) {
            return validation;
        }

        // بررسی تاریخ انقضا
        if (validation.data && validation.data.auth_date) {
            const expirationCheck = this.checkExpiration(validation.data.auth_date);
            
            if (!expirationCheck.valid) {
                return {
                    valid: false,
                    error: expirationCheck.error,
                    type: 'expiration'
                };
            }
        }

        // بررسی IP (اختیاری)
        if (userIP && validation.data) {
            // در اینجا می‌توانید منطق بررسی IP را اضافه کنید
            console.log('User IP:', userIP);
        }

        return {
            valid: true,
            data: validation.data,
            user: validation.data?.user ? JSON.parse(validation.data.user) : null,
            chat: validation.data?.chat_type,
            authDate: validation.data?.auth_date
        };
    }
}

module.exports = EitaaHashValidator;
```

---

## 6. راهنمای استفاده

### نصب و راه‌اندازی

1. **نصب وابستگی‌ها:**
```bash
cd server
npm install
```

2. **تنظیم توکن ربات:**
در فایل `server/server.js`، مقدار `BOT_TOKEN` را با توکن ربات خود جایگزین کنید.

3. **راه‌اندازی سرور:**
```bash
npm start
```

4. **دسترسی به مینی‌اپ:**
مینی‌اپ در آدرس `http://localhost:3000` در دسترس خواهد بود.

### تست مینی‌اپ

1. **در محیط ایتا:**
   - مینی‌اپ را در ایتا باز کنید
   - تمام قابلیت‌ها در دسترس خواهند بود

2. **در مرورگر:**
   - آدرس `http://localhost:3000` را باز کنید
   - برخی قابلیت‌ها (مانند سنسورها) غیرفعال خواهند بود

### ویژگی‌های کلیدی

- **احراز هویت امن:** استفاده از HMAC-SHA256 برای اعتبارسنجی
- **مدیریت تم:** تطبیق خودکار با تم ایتا
- **API Bridge کامل:** استفاده از تمام APIهای اصلی
- **سنسورها:** شتاب‌سنج و ژیروسکوپ
- **تعامل کاربر:** پاپ‌آپ، هشدار، تأیید
- **مدیریت رویدادها:** نظارت بر تغییرات تم و نمایش

---

## 7. نکات مهم امنیتی

### احراز هویت
- همیشه داده‌های اولیه را در سرور اعتبارسنجی کنید
- از توکن ربات محافظت کنید
- تاریخ انقضا را بررسی کنید

### API Bridge
- فقط در پاسخ به تعامل کاربر از APIها استفاده کنید
- از `ready()` برای اعلام آمادگی استفاده کنید
- مدیریت خطاها را جدی بگیرید

### داده‌های کاربر
- اطلاعات حساس را فقط در سرور پردازش کنید
- از HTTPS استفاده کنید
- لاگ‌گیری مناسب انجام دهید

---

## 8. عیب‌یابی

### مشکلات رایج

1. **خطای "API ایتا یافت نشد":**
   - مطمئن شوید که اسکریپت ایتا در `<head>` بارگذاری شده
   - بررسی کنید که مینی‌اپ در محیط ایتا اجرا می‌شود

2. **خطای احراز هویت:**
   - توکن ربات را بررسی کنید
   - تاریخ سرور را بررسی کنید
   - لاگ‌های سرور را بررسی کنید

3. **خطای سنسورها:**
   - مطمئن شوید که در محیط ایتا اجرا می‌شود
   - مجوزهای دستگاه را بررسی کنید

### لاگ‌گیری

برای عیب‌یابی بهتر، لاگ‌های کنسول را بررسی کنید:

```javascript
// در مرورگر
console.log('WebApp:', window.Eitaa?.WebApp);

// در سرور
console.log('Validation result:', validationResult);
```

---

این مثال جامع تمام جنبه‌های مهم توسعه مینی‌اپ ایتا را پوشش می‌دهد و می‌تواند به عنوان پایه‌ای برای پروژه‌های واقعی استفاده شود. 