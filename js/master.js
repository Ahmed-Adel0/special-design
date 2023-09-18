// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// Check If Color Local Storage Is Not Empty
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    // Remove Active Claas From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(el => {
        el.classList.remove("active");
        // Add Active Class On Element With Data-Color === Local Storage Item
        if (el.dataset.color === mainColors) {
            // Add Active Class
            el.classList.add("active");
        }
    });
}

// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Inteval
let backgroundInterval;
// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // Remove Active Claas From All Items
    document.querySelectorAll(".random-background span").forEach(el => {
        el.classList.remove("active");
        // Add Active Class On Element With Data-Background === Local Storage Item
        if (backgroundLocalItem === 'true') {
            document.querySelector(".random-background .yes").classList.add("active");
        } else {
            document.querySelector(".random-background .no").classList.add("active");
        }
    });
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    // Toggle Class Fa-spin For Rottion On Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach(li => {

    // Click On Every List Items
    li.addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
})

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");

// Loop On All Spans
randomBackEl.forEach(span => {
        // Click On Every Span
        span.addEventListener("click", (e) => {
            handleActive(e);
            if (e.target.dataset.background === "yes") {
                backgroundOption = true;
                randomizeImgs();
                localStorage.setItem("background_option", true);
            } else {
                backgroundOption = false;
                clearInterval(backgroundInterval);
                localStorage.setItem("background_option", false);
            }
        });
})


// Select Landing Page Element
let LandingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["14.webp", "15.webp", "img-1.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background Image Url
            LandingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 10000)
    }
}
randomizeImgs();

// Select Skills Sellector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // Skills Offset Top
    let skillsOffSetTop = ourSkills.offsetTop;
    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window ScrollTop
    let woindowScrollTop = this.pageYOffset;
    if (woindowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

// Create Popup with the image
let ourGallary = document.querySelectorAll(".gallary .images-box img");

ourGallary.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay Elemnent
        let overlay = document.createElement("div");
        // Add Class to overlay
        overlay.className = "popup-overlay";
        // Append Ovelay To The Body
        document.body.appendChild(overlay);
        // Create Popup Box
        let popupBox = document.createElement("div");
        // Create Class To Popup Box
        popupBox.className = "popup-box";
        if (img !== null) {
            // Create Heading
            let igHeading = document.createElement("h3");
            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);
            // AppendThe Text To The Heading
            igHeading.appendChild(imgText);
            // Append Heading To Popup Box
            popupBox.appendChild(igHeading);
        }
        // Create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Append Image To Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup To The Body
        document.body.appendChild(popupBox);
        // Create The Close Span
        let closeButton = document.createElement("span");
        // Create Class To Span
        closeButton.className = 'close-button';
        // Create text close btn
        closeBtnText = document.createTextNode("X");
        // Append text to close btn
        closeButton.appendChild(closeBtnText);
        // Add close btn to the Popup box
        popupBox.appendChild(closeButton);
    });
})

// Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
    }
})

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All links
const links = document.querySelectorAll(".links a");

function scrollToSection(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
    })
}

scrollToSection(allBullets);
scrollToSection(links);

// Handle Active State
function handleActive(ev) {
        // Remove Active Claas From All Children
        ev.target.parentElement.querySelectorAll(".active").forEach(el => {
            el.classList.remove("active");
        });
        // Add Active Class On Current Element
        ev.currentTarget.classList.add("active");
}

// Select All BulletsSpan
let bulletsSpan = document.querySelectorAll(".bullets-option span");
// Select All Side Bullets
let sideBullets = document.querySelector(".nav-bullets");
// Local Storage
let bolletLocal = localStorage.getItem(".bullets_option");

if (bolletLocal !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bolletLocal === 'block') {
        sideBullets.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        sideBullets.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (el) => {
        if (span.dataset.display === "block") {
            sideBullets.style.display = 'block';
            localStorage.setItem(".bullets_option", 'block');
        } else {
            sideBullets.style.display = 'none';
            localStorage.setItem(".bullets_option", 'none');
        }
        handleActive(el);
    });
});

// Reset Button
document.querySelector(".reset-option").onclick = function () {
    localStorage.clear();
    // Reload Window
    window.location.reload();
};

// Toggle menu
let toggleBtn = document.querySelector(".toglle-menu");
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    // Stop Propagation
    e.stopPropagation();
    // Toggle Class "menu-active" On Buttom
    this.classList.toggle("menu-active");
    // Toggle Class "open" On Links
    theLinks.classList.toggle("open");
}

// Click Anywhere Outside Menu And Toggle Buttom
document.addEventListener('click', (e) => {
    if (e.target !== toggleBtn && e.target !== theLinks) {
        // Check If Menu Is Open
        if (theLinks.classList.contains("open")) {
            // Toggle Class "menu-active" On Buttom
            toggleBtn.classList.toggle("menu-active");
            // Toggle Class "open" On Links
            theLinks.classList.toggle("open");
        }
    }
})
// Stop Propagation On Menu
theLinks.onclick = function (e) {
    e.stopPropagation();
}