const rootMenuNav = document.getElementsByClassName("steamdesktop_TitleBar_39oUC")[0]
const accountNewsMore = document.getElementsByClassName("steamdesktop_TitleBarControls_1-9si")[0]
const windowControls = document.getElementsByClassName("steamdesktop_WindowControls_qp17e")[0]

const topBar = document.getElementsByClassName("steamdesktop_TopBar_3Z7VQ")[0]
const outerFrame = document.getElementsByClassName("steamdesktop_OuterFrame_3mz8w")[0]
const contentFrame = document.getElementsByClassName("steamdesktop_ContentFrame_1rDh5")[0]

const bigPicture = document.getElementsByClassName("titlebarcontrols_VRToggle_3lRfT")[0].parentNode
const vrMode = document.getElementsByClassName("titlebarcontrols_GamepadUIToggle_3LKQ3")[0].parentNode


// Moving all the big parts
outerFrame.insertBefore(rootMenuNav, outerFrame.firstChild) 
contentFrame.insertBefore(topBar, contentFrame.firstChild) 
topBar.appendChild(accountNewsMore)

// Moving parts inside of the account area
accountNewsMore.insertBefore(bigPicture, accountNewsMore.firstChild)
accountNewsMore.insertBefore(vrMode, accountNewsMore.firstChild)



// This breaks things. it stays in the corner.
topBar.appendChild(windowControls)