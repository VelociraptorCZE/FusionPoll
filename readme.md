# Fusion Poll

### Development

Install dependencies using NPM

```
npm i
```

For development purposes use **dev:js** command to build JavaScript in development mode

```
npm run dev:js
```

For SCSS use **dev:scss**

```
npm run dev:css
```

You have to also install PHP dependecies

```
composer install
```

Then copy config.yml as config.local.yml.

### Production

Use **build** command to build JavaScript alongside SCSS in production mode

```
npm run build
```