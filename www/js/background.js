


// Run when the device is ready
document.addEventListener("deviceready", function () {

    // Android customization
    // To indicate that the app is executing tasks in background and being paused would disrupt the user.
    // The plug-in has to create a notification while in background - like a download progress bar.
    cordova.plugins.backgroundMode.setDefaults({
        title: 'Invest in this artwork!!',
        text: 'A very exciting artwork to invest in'
        //resume: false
    });

    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    cordova.plugins.backgroundMode.onfailure = function (errorCode) {
    };

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        //var id = guid();
        // Set an interval of 30 minutes (1800000 milliseconds)
        setInterval(function () {
            cordova.plugins.backgroundMode.configure({
                title: 'Invest in this artwork!! :)'
            })
        }, 5000);

        //onNotificationGCM(id);


    }
}, false);
/**
 * Created by dhruv on 12/03/2016.
 */

//************************************  OUTSIDE DEVICE READY
// handle APNS notifications for iOS
//function onNotificationAPN(e) {
//    // storage the e.id value  (the extra value sent in push notification)
//    window.localStorage.setItem("push_que", e.id);
//    var push_que = e.id;
//    // if the push notification is coming inline
//    if (e.foreground == "1") {
//        // storage the e.numero value  (the extra value sent in push notification)
//        window.localStorage.setItem("push_que", e.id);
//        var push_que = e.id;
//        /// some code here to open a message  if a new push is recieved inline
//        ;
//    }
//    if (event.alert) {
//        navigator.notification.alert(event.alert);
//    }
//    if (event.sound) {
//        var snd = new Media(event.sound);
//        snd.play();
//    }
//    if (event.badge) {
//        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
//    }
//}
//
//// handle GCM notifications for Android
//function onNotificationGCM(e) {
//    switch (e.event) {
//        if
//            (e.foreground)
//        {
//            //  if the push is recieved inline
//            //  storage the value of  playoad.id,  the extra value sent by push
//            window.localStorage.setItem("push_que", e.payload.id);
//            var push_que = e.payload.id;
//
//        }
//        else
//        {
//            // otherwise we were launched because the user touched a notification in the notification tray
//
//            if (e.coldstart) {
//                //  storage the value of  playoad.numero, the extra value sent by push
//                window.localStorage.setItem("push_que", e.payload.id);
//
//            }
//            else {
//                //  storage the value of  playoad.numero, the extra value sent by push
//                window.localStorage.setItem("push_que", e.payload.id);
//
//            }
//        }
//
//            break;
//
//        case 'error':
//            break;
//        default:
//            break;
//    }
//}
//
//function guid() {
//    function s4() {
//        return Math.floor((1 + Math.random()) * 0x10000)
//            .toString(16)
//            .substring(1);
//    }
//    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//        s4() + '-' + s4() + s4() + s4();
//}
//
//
//
////********************************** END OUTSIDE DEVICE READY
