eas build:configure
# inside eas.json add this configuration
  "build": {
      ...

      "production": {
        ...
        "android": {
          ...
          "buildType": "apk"
        }
      },
      ...
  }

eas build --platform android --profile preview
# download the apk file 

# connect phone with developer option and usb debugging option
# then run this command

adb install-multiple -r uog.apk
