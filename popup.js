// Display the detected classes and their statuses in the popup
// Display the detected classes and their statuses in the popup
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateClassList') {
        const classList = document.getElementById('class-list');
        classList.innerHTML = ''; // Clear previous list
        
        message.classes.forEach((classStatus) => {
            const listItem = document.createElement('li');
            
            // Create class name element
            const classNameSpan = document.createElement('span');
            classNameSpan.classList.add('class-name');
            classNameSpan.textContent = classStatus.className;
            
            // Create status element
            const statusSpan = document.createElement('span');
            statusSpan.classList.add('status');
            statusSpan.textContent = classStatus.hasStarted ? 'Started' : 'Not Started';

            listItem.appendChild(classNameSpan);
            listItem.appendChild(statusSpan);
            classList.appendChild(listItem);
        });
    }
});


// Handle enabling/disabling the extension
document.getElementById('toggle-extension').addEventListener('click', () => {
    chrome.storage.sync.get('enabled', (data) => {
        const enabled = !data.enabled;
        chrome.storage.sync.set({ enabled });
        updateToggleButton(enabled);
    });
});

// Update the toggle button based on the extension state
function updateToggleButton(enabled) {
    const button = document.getElementById('toggle-extension');
    button.textContent = enabled ? 'Disable Extension' : 'Enable Extension';
}

// Initialize the popup with the current extension state
chrome.storage.sync.get('enabled', (data) => {
    const enabled = data.enabled ?? true;
    updateToggleButton(enabled);
});
