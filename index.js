
const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")

const navToggle = document.querySelector("#nav-dropdown-toggle-0")
const navDropdown = document.querySelector("#nav-dropdown-list-0")


function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("max-lg:!tw-opacity-100", "tw-min-h-[90vh]")
        collapseHeaderItems.style.height = "90vh"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        document.body.classList.add("modal-open")

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("max-lg:!tw-opacity-100", "tw-min-h-[90vh]")
        collapseHeaderItems.style.height = "0vh"
        
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")  
        
        collapseBtn.classList.add("bi-list")
        document.body.classList.remove("modal-open")

        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (!isHeaderCollapsed){
        toggleHeader()
    }

    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.height = ""
        navToggle.addEventListener("mouseenter", openNavDropdown)
        navToggle.addEventListener("mouseleave", navMouseLeave)

    } else {
        isHeaderCollapsed = true
        navToggle.removeEventListener("mouseenter", openNavDropdown)
        navToggle.removeEventListener("mouseleave", navMouseLeave)
    }
}
responsive()
window.addEventListener("resize", responsive)

if (localStorage.getItem('color-mode') === 'dark' || (!('color-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('tw-dark')
    updateToggleModeBtn()
} else {
    document.documentElement.classList.remove('tw-dark')
    updateToggleModeBtn()
}

function toggleMode(){
    document.documentElement.classList.toggle("tw-dark")
    updateToggleModeBtn()
    
}

function updateToggleModeBtn(){

    const toggleIcon = document.querySelector("#toggle-mode-icon")
    
    if (document.documentElement.classList.contains("tw-dark")){
        
        toggleIcon.classList.remove("bi-sun")
        toggleIcon.classList.add("bi-moon")
        localStorage.setItem("color-mode", "dark")
        
    }else{
        toggleIcon.classList.add("bi-sun")
        toggleIcon.classList.remove("bi-moon")
        localStorage.setItem("color-mode", "light")
    }

}


const promptWindow =  new Prompt("#pixa-playground")
const promptForm = document.querySelector("#prompt-form")
const promptInput = promptForm.querySelector("input[name='prompt']")

const MAX_PROMPTS = 3

promptForm.addEventListener("submit", (event) => {
    event.preventDefault()

    

    if (promptWindow.promptList.length >= MAX_PROMPTS)
        return false

    promptWindow.addPrompt(promptInput.value)
    promptInput.value = ""
    
    if (promptWindow.promptList.length >= MAX_PROMPTS){
        
        const signUpPrompt = document.querySelector("#signup-prompt")
        signUpPrompt.classList.add("tw-scale-100")
        signUpPrompt.classList.remove("tw-scale-0")

        promptForm.querySelectorAll("input").forEach(e => {e.disabled = true})
    }

    return false
})

const dropdowns = document.querySelectorAll('.dropdown')
dropdowns.forEach(dropdown => new Dropdown(`#${dropdown.id}`, promptWindow.setAIModel))


navToggle.addEventListener("click", toggleNavDropdown)
navDropdown.addEventListener("mouseleave", closeNavDropdown)

function toggleNavDropdown(){

    if (navDropdown.getAttribute("data-open") === "true"){
        closeNavDropdown()
    }else{
        openNavDropdown()
    }
}

function navMouseLeave(){
    setTimeout(closeNavDropdown, 100)
}

function openNavDropdown(event){

    navDropdown.classList.add("tw-opacity-100", "tw-scale-100", 
                            "max-lg:tw-min-h-[450px]", "max-lg:!tw-h-fit", "tw-min-w-[320px]")
    
    navDropdown.setAttribute("data-open", true)

}

function closeNavDropdown(event){

    
    
    if (navDropdown.matches(":hover")){
        return
    }

    navDropdown.classList.remove("tw-opacity-100", "tw-scale-100", 
        "max-lg:tw-min-h-[450px]", "tw-min-w-[320px]", "max-lg:!tw-h-fit",)

    navDropdown.setAttribute("data-open", false)

}


const videoBg = document.querySelector("#video-container-bg")
const videoContainer = document.querySelector("#video-container")

function openVideo(){
    videoBg.classList.remove("tw-scale-0", "tw-opacity-0")
    videoBg.classList.add("tw-scale-100", "tw-opacity-100")
    videoContainer.classList.remove("tw-scale-0")
    videoContainer.classList.add("tw-scale-100")

    document.body.classList.add("modal-open")
}

function closeVideo(){
    videoContainer.classList.add("tw-scale-0")
    videoContainer.classList.remove("tw-scale-100")

    setTimeout(() => {
        videoBg.classList.remove("tw-scale-100", "tw-opacity-100")
        videoBg.classList.add("tw-scale-0", "tw-opacity-0")
    }, 400)
   

    document.body.classList.remove("modal-open")

}

/**
 * Animations
 */





gsap.to("#dashboard", {

    scale: 1,
    translateY: 0,
    
    rotateX: "0deg",
    scrollTrigger: {
        trigger: "#hero-section",
        start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
        end: "bottom bottom",
        scrub: 1,
        
    }

})

const faqAccordion = document.querySelectorAll('.faq-accordion')

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active')

        
        let content = this.nextElementSibling
        let icon = this.querySelector(".bi-plus")

        
        if (content.style.maxHeight === '240px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'
            icon.style.transform = "rotate(0deg)"
            
        } else {
            content.style.maxHeight = '240px'
            content.style.padding = '20px 18px'
            icon.style.transform = "rotate(45deg)"
        }
    })
})





const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "10% 80%", 
                                                            end: "20% 90%",
                                                            
                                                            
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})



const waitlistForm = document.getElementById('waitlist-form')
const waitlistEmail = document.getElementById('waitlist-email')
const waitlistSuggestion = document.getElementById('waitlist-suggestion')
const waitlistSubmit = document.getElementById('waitlist-submit')
const waitlistMessage = document.getElementById('waitlist-message')
const customErrorPopup = document.getElementById('custom-error-popup')
const errorMessageText = document.getElementById('error-message-text')
const submitText = document.getElementById('submit-text')


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Please include an '@' in the email address." }
    }
    
    
    const trustedDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
        'icloud.com', 'me.com', 'mac.com', 'aol.com', 'protonmail.com',
        'proton.me', 'zoho.com', 'yandex.com', 'mail.com', 'gmx.com',
        'tutanota.com', 'fastmail.com', 'hey.com', 'msn.com',
        'bellsouth.net', 'charter.net', 'comcast.net', 'cox.net', 'earthlink.net',
        'juno.com', 'netzero.com', 'roadrunner.com', 'rocketmail.com', 'sbcglobal.net',
        'verizon.net', 'att.net', 'yahoo.co.uk', 'yahoo.ca', 'yahoo.com.au',
        'yahoo.fr', 'yahoo.de', 'yahoo.it', 'yahoo.es', 'yahoo.in',
        'hotmail.co.uk', 'hotmail.ca', 'hotmail.com.au', 'hotmail.fr', 'hotmail.de',
        'hotmail.it', 'hotmail.es', 'hotmail.in', 'outlook.co.uk', 'outlook.ca',
        'outlook.com.au', 'outlook.fr', 'outlook.de', 'outlook.it', 'outlook.es',
        'outlook.in', 'live.co.uk', 'live.ca', 'live.com.au', 'live.fr', 'live.de',
        'live.it', 'live.es', 'live.in'
    ]
    
    
    const blockedDomains = [
        '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
        'yopmail.com', 'temp-mail.org', 'throwaway.email', 'getnada.com',
        'maildrop.cc', 'sharklasers.com', 'grr.la', 'guerrillamailblock.com',
        'pokemail.net', 'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com',
        'emailondeck.com', 'fakeinbox.com', 'fakemailgenerator.com', 'mailcatch.com',
        'mailmoat.com', 'mailsac.com', 'mytrashmail.com', 'nobulk.com',
        'spamgourmet.com', 'spamhereplease.com', 'tempail.com', 'tempe-mail.com',
        'tempinbox.co.uk', 'tempinbox.com', 'tempmail.de', 'tempmail.net',
        'tempmail2.com', 'tempmailer.com', 'tempmailer.de', 'tempthe.net',
        'trashmail.at', 'trashmail.com', 'trashmail.de', 'trashmail.net',
        'trashmailer.com', 'trbvm.com', 'trbvn.com', 'trbvo.com', 'trbvp.com',
        'trbvq.com', 'trbvr.com', 'trbvs.com', 'trbvt.com', 'trbvu.com',
        'trbvv.com', 'trbvw.com', 'trbvx.com', 'trbvy.com', 'trbvz.com',
        'trbwa.com', 'trbwb.com', 'trbwc.com', 'trbwd.com', 'trbwe.com',
        'trbwf.com', 'trbwg.com', 'trbwh.com', 'trbwi.com', 'trbwj.com',
        'trbwk.com', 'trbwl.com', 'trbwm.com', 'trbwn.com', 'trbwo.com',
        'trbwp.com', 'trbwq.com', 'trbwr.com', 'trbws.com', 'trbwt.com',
        'trbwu.com', 'trbwv.com', 'trbww.com', 'trbwx.com', 'trbwy.com',
        'trbwz.com', 'trbxa.com', 'trbxb.com', 'trbxc.com', 'trbxd.com',
        'trbxe.com', 'trbxf.com', 'trbxg.com', 'trbxh.com', 'trbxi.com',
        'trbxj.com', 'trbxk.com', 'trbxl.com', 'trbxm.com', 'trbxn.com',
        'trbxo.com', 'trbxp.com', 'trbxq.com', 'trbxr.com', 'trbxs.com',
        'trbxt.com', 'trbxu.com', 'trbxv.com', 'trbxw.com', 'trbxx.com',
        'trbxy.com', 'trbxz.com', 'trbya.com', 'trbyb.com', 'trbyc.com',
        'trbyd.com', 'trbye.com', 'trbyf.com', 'trbyg.com', 'trbyh.com',
        'trbyi.com', 'trbyj.com', 'trbyk.com', 'trbyl.com', 'trbym.com',
        'trbyn.com', 'trbyo.com', 'trbyp.com', 'trbyq.com', 'trbyr.com',
        'trbys.com', 'trbyt.com', 'trbyu.com', 'trbyv.com', 'trbyw.com',
        'trbyx.com', 'trbyy.com', 'trbyz.com', 'trbza.com', 'trbzb.com',
        'trbzc.com', 'trbzd.com', 'trbze.com', 'trbzf.com', 'trbzg.com',
        'trbzh.com', 'trbzi.com', 'trbzj.com', 'trbzk.com', 'trbzl.com',
        'trbzm.com', 'trbzn.com', 'trbzo.com', 'trbzp.com', 'trbzq.com',
        'trbzr.com', 'trbzs.com', 'trbzt.com', 'trbzu.com', 'trbzv.com',
        'trbzw.com', 'trbzx.com', 'trbzy.com', 'trbzz.com'
    ]
    
    
    const domain = email.split('@')[1]?.toLowerCase()
    
    if (!domain) {
        return { valid: false, message: "Please include an '@' in the email address." }
    }
    
    
    if (blockedDomains.includes(domain)) {
        return { 
            valid: false, 
            message: "Temporary email addresses are not allowed. Please use a permanent email address." 
        }
    }
    
    
    if (!trustedDomains.includes(domain)) {
        
        
        return { valid: true, message: "" }
    }
    
    return { valid: true, message: "" }
}


function showCustomError(message) {
    errorMessageText.textContent = message
    customErrorPopup.classList.remove('tw-hidden')
    
    
    setTimeout(() => {
        hideCustomError()
    }, 5000)
}


function hideCustomError() {
    customErrorPopup.classList.add('tw-hidden')
}


function showMessage(message, isSuccess = true) {
    if (!isSuccess) {
        
        showCustomError(message)
        return
    }
    
    
    waitlistMessage.innerHTML = `
        <div class="tw-flex tw-items-center tw-justify-center tw-gap-3">
            <div class="tw-w-6 tw-h-6 tw-bg-green-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                <i class="bi bi-check tw-text-white tw-text-sm tw-font-bold"></i>
            </div>
            <span>${message}</span>
        </div>
    `
    waitlistMessage.classList.remove('tw-hidden')
    waitlistMessage.classList.remove('tw-text-red-500', 'tw-bg-red-50', 'tw-border-red-200', 'tw-border')
    waitlistMessage.classList.add('tw-text-black', 'dark:tw-text-white', 'tw-bg-gray-50', 'dark:tw-bg-gray-900', 'tw-border-gray-200', 'dark:tw-border-gray-700', 'tw-border', 'tw-rounded-lg', 'tw-p-6', 'tw-font-medium', 'tw-shadow-sm', 'tw-text-base')
    
    
    setTimeout(() => {
        waitlistMessage.style.opacity = '1'
        waitlistMessage.style.transform = 'translateY(0)'
    }, 10)
    
    
    setTimeout(() => {
        waitlistMessage.classList.add('tw-hidden')
    }, 5000)
}


waitlistSuggestion.addEventListener('input', function() {
    const count = this.value.length
    
    
    if (count > 450) {
        this.classList.add('tw-border-red-500')
        this.classList.remove('tw-border-gray-300', 'dark:tw-border-gray-600')
    } else if (count > 400) {
        this.classList.add('tw-border-yellow-500')
        this.classList.remove('tw-border-gray-300', 'dark:tw-border-gray-600')
    } else {
        this.classList.remove('tw-border-red-500', 'tw-border-yellow-500')
        this.classList.add('tw-border-gray-300', 'dark:tw-border-gray-600')
    }
})


function storeWaitlistData(email, suggestion) {
    
    let waitlistData = JSON.parse(localStorage.getItem('waitlistData') || '[]')
    
    
    const existingEntry = waitlistData.find(entry => entry.email === email)
    if (existingEntry) {
        return false 
    }
    
    
    const newEntry = {
        email: email,
        suggestion: suggestion || '',
        timestamp: new Date().toISOString()
    }
    
    waitlistData.push(newEntry)
    localStorage.setItem('waitlistData', JSON.stringify(waitlistData))
    
    
    console.log('New waitlist signup:', newEntry)
    console.log('All waitlist data:', waitlistData)
    
    return true 
}


function sendEmailNotification(email, suggestion) {
    
    const serviceID = 'service_xegdjrl' 
    const templateID = 'template_g72pg7k' 
    const publicKey = 'vlA4ZV1UDxgGlyReg' 
    
    
    const templateParams = {
        from_email: email,
        suggestion: suggestion || 'No suggestion provided',
        timestamp: new Date().toLocaleString()
    }
    
    
    if (typeof emailjs !== 'undefined') {
        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(function(response) {
                console.log('Email sent successfully:', response.status, response.text)
            }, function(error) {
                console.error('Email sending failed:', error)
                
                storeWaitlistData(email, suggestion)
            })
    } else {
        console.warn('EmailJS not loaded, storing data locally')
        
        storeWaitlistData(email, suggestion)
    }
}


waitlistForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const email = waitlistEmail.value.trim()
    const suggestion = waitlistSuggestion.value.trim()
    
    
    if (!email) {
        showMessage('Please enter your email address.', false)
        return
    }
    
    const validation = isValidEmail(email)
    if (!validation.valid) {
        showMessage(validation.message, false)
        return
    }
    
    
    waitlistSubmit.disabled = true
    submitText.textContent = 'Joining...'
    waitlistSubmit.classList.add('tw-opacity-75', 'tw-cursor-not-allowed')
    
    
    setTimeout(() => {
        
        const success = storeWaitlistData(email, suggestion)
        
        if (success) {
            
            sendEmailNotification(email, suggestion)
            
            showMessage('Thank you! You\'ve been added to our waitlist. We\'ll notify you when Playdium launches!', true)
            waitlistEmail.value = '' 
            waitlistSuggestion.value = ''
            
            waitlistSuggestion.classList.remove('tw-border-red-500', 'tw-border-yellow-500')
            waitlistSuggestion.classList.add('tw-border-gray-300', 'dark:tw-border-gray-600')
        } else {
            showMessage('This email is already on our waitlist!', false)
        }
        
        
        waitlistSubmit.disabled = false
        submitText.textContent = 'Join the Waitlist'
        waitlistSubmit.classList.remove('tw-opacity-75', 'tw-cursor-not-allowed')
    }, 1000)
})


waitlistEmail.addEventListener('blur', function() {
    const email = this.value.trim()
    if (email) {
        const validation = isValidEmail(email)
        if (!validation.valid) {
            this.style.borderColor = '#ef4444' 
            showCustomError(validation.message)
        } else {
            this.style.borderColor = '' 
            hideCustomError() 
        }
    } else {
        this.style.borderColor = '' 
        hideCustomError() 
    }
})

waitlistEmail.addEventListener('input', function() {
    
    this.style.borderColor = ''
    
    hideCustomError()
})



window.getAllWaitlistData = function() {
    const data = JSON.parse(localStorage.getItem('waitlistData') || '[]')
    console.log('All waitlist data:', data)
    console.log('Total entries collected:', data.length)
    return data
}



window.exportWaitlistData = function() {
    const data = JSON.parse(localStorage.getItem('waitlistData') || '[]')
    const csvContent = 'Email,Suggestion,Timestamp\n' + 
        data.map(entry => `"${entry.email}","${entry.suggestion.replace(/"/g, '""')}","${entry.timestamp}"`).join('\n')
    
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'waitlist-data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    console.log('CSV file downloaded with', data.length, 'entries')
}


window.getAllWaitlistEmails = function() {
    const data = JSON.parse(localStorage.getItem('waitlistData') || '[]')
    const emails = data.map(entry => entry.email)
    console.log('All waitlist emails:', emails)
    console.log('Total emails collected:', emails.length)
    return emails
}
