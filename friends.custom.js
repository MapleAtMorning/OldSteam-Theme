document.onkeyup = function (e){
    console.log(e.key)
    if (e.key.toLowerCase() === "f5"){
        window.opener.eval("location.reload()");
    }
}