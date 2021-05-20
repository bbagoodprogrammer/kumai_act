const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

function statusChangeCallback(response) {
    // Called with the results from FB.getLoginStatus().
    console.log("statusChangeCallback");
    console.log(response); // The current login status of the person.
    if (response.status === "connected") {
        // Logged into your webpage and Facebook.
        // testAPI();
        window.userID = response.authResponse.userID;
        window.accessToken = response.authResponse.accessToken;
    } else {
        // Not logged into your webpage or we are unable to tell.
        document.getElementById("status").innerHTML =
            "Please log " + "into this webpage.";
    }
}

function checkLoginState() {
    // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {
        // See the onlogin handler
        statusChangeCallback(response);
    });
}

//加载facebook SDK
// (function(d, s, id) {
//     var js,
//         fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = `https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v10.0&appId=${
//         ios ? "532601534077009" : "402501240591895"
//     }&autoLogAppEvents=1`;
//     fjs.parentNode.insertBefore(js, fjs);
// })(document, "script", "facebook-jssdk");

console.log("getStates", AREA);
window.fbAsyncInit = function() {
    FB.init({
        appId: AREA == "vn" ? "1418697961633279" : "402501240591895",
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: "v10.0" // Use this Graph API version for this call.
    });
    //獲取FB賬號登錄狀態
    FB.getLoginStatus(function(response) {
        // Called after the JS SDK has been initialized.
        statusChangeCallback(response); // Returns the login status.
    });
};

//handle a session response from any of the auth related calls
function handleSessionResponse(response) {
    //if we dont have a session (which means the user has been logged out, redirect the user)
    if (!response.session) {
        //window.location = "/mysite/Login.aspx";
        return;
    }

    //if we do have a non-null response.session, call FB.logout(),
    //the JS method will log the user out of Facebook and remove any authorization cookies
    FB.logout(handleSessionResponse);
}

function testAPI() {
    // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log("Welcome!  Fetching your information.... ");
    FB.api("/me", function(response) {
        console.log("Successful login for: " + response.name);
        document.getElementById("status").innerHTML =
            "Thanks for logging in, " + response.name + "!";
    });
}
export { handleSessionResponse };
