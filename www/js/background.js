// Run when the device is ready
document.addEventListener("deviceready", function () {

    // Android customization
    // To indicate that the app is executing tasks in background and being paused would disrupt the user.
    // The plug-in has to create a notification while in background - like a download progress bar.
    cordova.plugins.backgroundMode.setDefaults({
        title: 'TheTitleOfYourProcess',
        text: 'A very exciting artwork to invest in',
        //resume: false
    });

    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    cordova.plugins.backgroundMode.onfailure = function(errorCode) {};

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {

        // Set an interval of 30 minutes (1800000 milliseconds)
        setInterval(function () {

            cordova.plugins.backgroundMode.configure({
                title: 'Invest in this artwork!! :)'
            })
        }, 5000);
    }
}, false);
/**
 * Created by dhruv on 12/03/2016.
 */
