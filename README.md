# CF Remote Controller

A remote control interface for Connected Futures built with Nuxt.

## Setup

1. Install Node.js on your Windows machine
2. Run `install.bat` as administrator - this will:
    - Install dependencies
    - Add required hosts file entry
    - Create your local `config.bat` from config.example.bat

3. Edit `config.bat` with your settings:
    ```batch
    :: Set the path to your game executable
    set GAME_PATH=C:\Path\To\Your\CF_2025.exe

    :: Set the UE server URL
    set UE_SERVER_URL=http://localhost:30010

    :: Set web interface port
    set WEB_PORT=3000
    ```

> Note: config.bat is not tracked in git - each machine should have its own local configuration

## Running the Application

You have several options to run the controller:

1. `start-game-and-controller.bat`
    - Starts both the game and controller
    - Checks if game path exists
    - Opens browser automatically

2. `start.bat`
    - Starts only the controller
    - Opens browser automatically

3. `start-hidden.bat`
    - Starts the controller in background
    - Opens browser automatically

4. `run-hidden.vbs`
    - Completely hidden start of the controller
    - Opens browser automatically

## Stopping the Controller

Run `stop-controller.bat` to stop the background controller process.

## Troubleshooting

1. If the game doesn't start:
    - Check the GAME_PATH in config.bat
    - Make sure you have correct permissions

2. If the controller can't connect:
    - Check UE_SERVER_URL in config.bat
    - Make sure the game is running with -RCWebControlEnable -RCWebInterfaceEnable

3. If the web interface doesn't open:
    - Check WEB_PORT in config.bat
    - Make sure no other application is using the port
    - Try opening http://cf-controller.local:3000 manually

```bash
node .output/server/index.mjs
```