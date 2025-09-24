# اصالت سنجی hash

روشی برای اصالت سنجی داده‌های دریافتی از سرور

شما می‌توانید با استفاده از این روش مقدار _**hash**_ را که در مرحله قبل اعتبار سنجی کردید را با سرور چک کنید و از اصالت آن مطمئن شوید

در این روش یک درخواست به آدرس:

```
https://eitaayar.ir/api/app/verify
```

با مقادیر:

```
{
  "token": "5768337691:AAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU", // توکن برنامه شما
  "hash": "c3bb1efcada7b75eec382110554ab07e57622e982a72cac38ba3e64f51d40bb9", // hash دریافتی
  "ip": "10.0.0.1" // ip درخواست کاربر
}
```

برای سرور ارسال کنید. در جواب، اگر درخواست از طریق ایتا ایجاد شده و کمتر از یک دقیقه از آن گذشته باشد، مقدار زیر را دریافت می‌کنید:

```
{
	"ok": true
}
```

و در غیر این صورت:

```
{
	"ok": false
}
```

را دریافت خواهید کرد.

:::info[نکته]
از آنجایی که مهلت درخواست اصالت سنجی از زمان ایجاد 1 دقیقه در نظر گرفته شده است، پس از این زمان حتی اگر اصالت مورد تایید هم باشد مقدار بازگشتی نشان از عدم اصالت سنجی دارد.
:::

:::info[نکته]
اصالت سنجی فقط یک بار ممکن است و پس از آن، مقدار بازگشتی نشان از عدم اصالت سنجی دارد.
:::

## نمونه curl ارسالی:[​](ValidateHash.md#نمونه-curl-ارسالی "لینک مستقیم به نمونه curl ارسالی:")

سرویس از هر دو صورت زیر پشتیبانی می‌کند.

در ضمن شما می‌توانید از هر دو متد GET و POST برای ارسال داده‌ها استفاده کنید.

### Query parameter[​](ValidateHash.md#query-parameter "لینک مستقیم به Query parameter")

```
curl --request GET \
  --url 'https://eitaayar.ir/api/app/verify?token=5768337691%3AAAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU&hash=c3bb1efcada7b75eec382110554ab07e57622e982a72cac38ba3e64f51d40bb9&ip=10.0.0.1'    
```

### Form url encoded[​](ValidateHash.md#form-url-encoded "لینک مستقیم به Form url encoded")

```
curl --request POST \
  --url https://eitaayar.ir/api/app/verify \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data token=5768337691:AAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU \
  --data hash=c3bb1efcada7b75eec382110554ab07e57622e982a72cac38ba3e64f51d40bb9 \
  --data ip=10.0.0.1
```

### Body[​](ValidateHash.md#body "لینک مستقیم به Body")

```
curl --request POST \
  --url https://eitaayar.ir/api/app/verify \
  --header 'Content-Type: application/json' \
  --data '{
	"token": "5768337691:AAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU",
	"hash": "c3bb1efcada7b75eec382110554ab07e57622e982a72cac38ba3e64f51d40bb9",
	"ip": "10.0.0.1"
}'
```

:::warning[هشدار]

این سرویس در ثانیه به حداکثر 20 درخواست پاسخ می‌دهد و پس از آن IP درخواست دهنده برای مدتی مسدود می‌شود.
:::

:::warning[هشدار]

استفاده از این سرویس رایگان و تابع مقررات ایتا است و در صورت هرگونه سوءاستفاده احتمالی، کاربر مسدود می‌شود.
:::

:::note[یادداشت]

می‌توانید در صورت نیاز، درخواست اصالت سنجی را به یک IP محدود کنید.
:::

:::info[اطلاع]

این سرویس صرفا برای امنیت بیشتر طراحی شده و استفاده از آن اجباری نیست.
:::