/*jshint esversion: 6 */
/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout
 * @returns {Promise<{querySelector: string matchedElements: Element[] }>}  resolves with original selector & found elements
 */
export function waitForElement(querySelector, timeout) {
    return new Promise((resolve, reject) => {
        /* Do a quick check so see if the element is already in the dom */
        const matchedElements = document.querySelectorAll(querySelector)
        if (matchedElements.length) {
            resolve({
                querySelector,
                matchedElements
            })
        }

        let timer = null

        /* Element wasn't already in the dom, so we shall listen to changes for a while */
        const observer = new MutationObserver(
            () => {
                const matchedElements = document.querySelectorAll(querySelector)
                if (matchedElements.length) {
                    if (timer) clearTimeout(timer)
                    observer.disconnect()
                    resolve({
                        querySelector,
                        matchedElements
                    })
                }
            })

        // watch changes to the body & its sub elements
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })

        /* Enforce the timeout */
        if (timeout) {
            timer = setTimeout(() => {
                observer.disconnect() // clean up
                reject(querySelector) // we didn't find anything in time :(
            }, timeout)
        }
    })
}

// TY Shadow from Millennium

async function runStyling(){
    const { querySelector, matchedElements } = await waitForElement('[class*="steamdesktop_OuterFrame_"] [class*="LocalContentContainer"]', 3000)
    console.log('awaited code', querySelector, matchedElements)
    
    const rootMenuNav = document.getElementsByClassName("steamdesktop_TitleBar_39oUC")[0]
    const accountNewsMore = document.getElementsByClassName("steamdesktop_TitleBarControls_1-9si")[0]
    
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
}

runStyling()