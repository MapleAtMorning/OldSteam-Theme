function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(5000).then(() => {

const rootMenuNav = document.getElementsByClassName("steamdesktop_TitleBar_39oUC")[0]
const accountNewsMore = document.getElementsByClassName("steamdesktop_TitleBarControls_1-9si")[0]
// const windowControls = document.getElementsByClassName("steamdesktop_WindowControls_qP17e")[0]

const topBar = document.getElementsByClassName("steamdesktop_TopBar_3Z7VQ")[0]
const bottomBar = document.getElementsByClassName("bottombar_BottomBarContainer_1_yS5")[0]
const outerFrame = document.getElementsByClassName("steamdesktop_OuterFrame_3mz8w")[0]
const contentFrame = document.getElementsByClassName("steamdesktop_ContentFrame_1rDh5")[0]

var vrMode = document.getElementsByClassName("titlebarcontrols_VRToggle_3lRfT")[0]

const steamLogoContainer = document.getElementsByClassName("rootmenu_SteamButton_bSKGl")[0]
const newLogo = document.createElement("img")
newLogo.src = "https://raw.githubusercontent.com/MapleAtMorning/Green-Steam-Theme/main/icon_steam.png"



// Moving all the big parts
outerFrame.insertBefore(rootMenuNav, outerFrame.firstChild) 
contentFrame.insertBefore(topBar, contentFrame.firstChild) 
topBar.appendChild(accountNewsMore)
contentFrame.appendChild(bottomBar)

// Replace the logo with the old one
steamLogoContainer.firstChild.remove()
steamLogoContainer.insertBefore(newLogo, steamLogoContainer.firstChild)

// Move the VR & Bigpicture buttons from the right of the account button to the left
const bigPicture = document.getElementsByClassName("titlebarcontrols_GamepadUIToggle_3LKQ3")[0].parentNode
accountNewsMore.insertBefore(bigPicture, accountNewsMore.firstChild)
if (vrMode != undefined){
    vrMode = vrMode.parentNode
    accountNewsMore.insertBefore(vrMode, accountNewsMore.firstChild)
}
});