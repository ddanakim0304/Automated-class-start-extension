// Function to get and list all detected classes
function getDetectedClasses() {
    const classes = [];
    const classElements = document.querySelectorAll('a.class-link.body-l');
    
    classElements.forEach((classElement) => {
        const className = classElement.textContent.trim();
        const enterButton = classElement.closest('div.flex').querySelector('button[class*="enter-class"]');
        
        const classStatus = {
            className,
            hasStarted: enterButton && !enterButton.disabled
        };
        
        classes.push(classStatus);
    });
    
    return classes;
}

// Function to click the "Enter Class" button if available and update class status
function clickEnterClassButton() {
    const classList = getDetectedClasses();
    
    classList.forEach((classStatus) => {
        if (classStatus.hasStarted) {
            const button = document.querySelector(`a[class-link.body-l]:contains(${classStatus.className})`)
                                .closest('div.flex')
                                .querySelector('button[class*="enter-class"]');
            if (button) {
                button.click();
                console.log(`Clicked the Enter Class button for ${classStatus.className}`);
            }
        }
    });

    updatePopupClasses(classList);
}

// Function to update the popup with class statuses
function updatePopupClasses(classes) {
    chrome.runtime.sendMessage({
        action: 'updateClassList',
        classes
    });
}

// Start the extension when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', clickEnterClassButton);
} else {
    clickEnterClassButton();
}

// Periodically check for new classes and update the popup
setInterval(clickEnterClassButton, 1000);
