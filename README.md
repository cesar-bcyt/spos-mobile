# Instrucciones
Este es el código fuente de `spos-mobile`, una aplicación móvil para supervisar y ver los resúmenes de operación del sistema de punto de venta [SPOS](https://github.com/seorospa/spos-server/).
Si sólo necesitas instalar la aplicación en tu teléfono o tablet, descárgala desde [Google Play](https://play.google.com/store/apps/details?id=com.example.sposmobile) o [AppStore](https://itunes.apple.com/us/app/keynote/spos-server).
## Paso 1
Si quieres probar la aplicación en tu celular o tablet, instala "[Expo Go](https://expo.dev/client)" desde la tienda de aplicaciones.
Si prefieres usar un emulador, entonces asegúrate de tener un [emulador instalado](https://docs.expo.io/workflow/android-studio-emulator/) y ve directo al paso 2.
## Paso 2
Descarga el código fuente e instala sus dependencias.
```
git clone https://github.com/cesar-bcyt/spos-mobile
cd spos-mobile
yarn install
```
Ejecuta la aplicación en un emulador o dispositivo conectado:
```
yarn start
```
Android/HarmonyOS:
```
yarn android
```
iOS:
```
yarn ios
```
