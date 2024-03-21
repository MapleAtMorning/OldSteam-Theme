document.onkeyup = function (e){
    if (e.key.toLowerCase() === "f5"){
        window.opener.eval("location.reload()");
    }
}