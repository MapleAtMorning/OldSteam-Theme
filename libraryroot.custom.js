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

// TY Shadow from Millennium & lazarFlashes for the code above 

async function runStyling(){
    const { querySelector, matchedElements } = await waitForElement('[class*="steamdesktop_OuterFrame_"] [class*="LocalContentContainer"]', 3000)
    console.log('awaited code', querySelector, matchedElements)
    
    const rootMenuNav = document.querySelector("[class*='steamdesktop_TitleBar_']")
    const accountNewsMore = document.querySelector("[class*='steamdesktop_TitleBarControls_']")
    
    const topBar = document.querySelector("[class*='steamdesktop_TopBar_']")
    const bottomBar = document.querySelector("[class*='bottombar_BottomBarContainer_']")
    const outerFrame = document.querySelector("[class*='steamdesktop_OuterFrame_']")
    const contentFrame = document.querySelector("[class*='steamdesktop_ContentFrame_']")
    
    var vrMode = document.querySelector("[class*='titlebarcontrols_VRToggle_']")
    
    const steamLogoContainer = document.querySelector("[class*='rootmenu_SteamButton_']")
    const newLogo = document.createElement("img")
    newLogo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpaIVBwsVcQhSnSyIijhKFYtgobQVWnUweemP0KQhSXFxFFwLDv4sVh1cnHV1cBUEwR8QJ0cnRRcp8b6k0CLGB5f3cd47h/vuA4R6malmxzigapaRisfEbG5FDLyiB2GqYYQlZuqJ9EIGnuvrHj6+30V5lve9P1evkjcZ4BOJZ5luWMTrxNObls55nzjESpJCfE48ZlCDxI9cl11+41x0WOCZISOTmiMOEYvFNpbbmJUMlXiKOKKoGuULWZcVzluc1XKVNfvkLwzmteU016mGEMciEkhChIwqNlCGhSjtGikmUnQe8/APOv4kuWRybYCRYx4VqJAcP/gf/J6tWZiccJOCMaDzxbY/RoDALtCo2fb3sW03TgD/M3CltfyVOjDzSXqtpUWOgL5t4OK6pcl7wOUOMPCkS4bkSH4qoVAA3s/om3JA/y3QverOrXmO0wcgQ7NaugEODoHRImWveby7q31u/95pzu8HiVBysCZNXyYAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkCxcLIiaC9YE/AAABgElEQVQ4y41Tv0sCYRh+9NoMp2ioqSWxhpb+gYKCnEToCOGCtkNojUYnJRSHPOqWc+imCIIgFDzQORXUUgxFHKKhwR/gXWNvi9/hjzv1gY/v5f3xvN/7fN/HAUAw5Oc+ip8EGwgi79nb3107C55ebWytf72X6l0zGAz5OcxBJBG+aTTrNI5Gs04BwefGIggi72XFAcHnZouRLEXAirO5NBERZXNpYn4AcM4j8G7vnDP76ODE3A1D/zZ+dSiqrDmndRi3xYvL65Hp0PIZAICWz8DlWt0c+VdsxXx+ffphohXLbxMa3KduX9gIiCTCUbvZp6EbQ9KNIRERxZKRJACABRRV1hRV1qq1splkRcBENLtZJQoi76nWyhM+RZU1y3dDNhBE3tvrd6ndaZEg8h5WPEPA7teKwBRqDpzHhz5HXIpK/UEPcSkqlSoFlCoFAPjrD3oTN2T77IMhPxdLRu5YZ3Z8RZXzdvmWzofHVLHdaVG70yJFlfNM7UUfboZ56QIA//3tbq2ow2VbAAAAAElFTkSuQmCC"
    
    
    // Moving all the big parts
    outerFrame.insertBefore(rootMenuNav, outerFrame.firstChild) 
    contentFrame.insertBefore(topBar, contentFrame.firstChild) 
    topBar.appendChild(accountNewsMore)
    contentFrame.appendChild(bottomBar)
    
    // Replace the logo with the old one
    steamLogoContainer.firstChild.remove()
    steamLogoContainer.insertBefore(newLogo, steamLogoContainer.firstChild)
    
    // Move the VR & Bigpicture buttons from the right of the account button to the left
    const bigPicture = document.querySelector("[class*='titlebarcontrols_GamepadUIToggle_']").parentNode
    accountNewsMore.insertBefore(bigPicture, accountNewsMore.firstChild)
    if (vrMode != undefined){
        vrMode = vrMode.parentNode
        accountNewsMore.insertBefore(vrMode, accountNewsMore.firstChild)
    }    
}

runStyling()