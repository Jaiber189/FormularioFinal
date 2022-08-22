## BYP

(Backend)

### Steps for install

-   Set APP_URL in .env (the backend url)
-   Set CLIENT_URL in .env (the frontend url)
-   Run migrations and seeders


### Resources and tips


```
// For add enum
// \DB::statement("ALTER TABLE `table_name` CHANGE `status` `status` ENUM(implode(getAllStatuses())) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT" . Status::PENDING . ";");
```