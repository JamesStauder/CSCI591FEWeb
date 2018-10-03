function addCookie(cookieName, information){
    setCookie(cookieName, information, 1);
}

function getCookieInfo(cookieName)
{
    var info = getCookie(cookieName);
    return info;
}

function setCookie(cname, cvalue, exdays){
    var date = new Date();
    date.setTime(date.getTime() + exdays*24*60*60*1000);
    var expires = "expires="+ date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";

}


