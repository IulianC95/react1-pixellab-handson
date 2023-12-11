// grab from dom
const notificationBar = document.querySelector('.notification-bar');

// addMessage
// Add a close button to notificationBar (optionally, also a timer)
export const addMessage = (messageElement) => {
  clearMessages();

  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.classList.add('bg-transparent', 'border-0');
  closeButton.onclick = () => notificationBar.removeChild(messageElement);

  messageElement.appendChild(closeButton);

  notificationBar.append(messageElement);

  setTimeout(() => {
    if (notificationBar.contains(messageElement)) {
      notificationBar.removeChild(messageElement);
    }
  }, 5000);
};

// clearMessages
export const clearMessages = () => {
  notificationBar.innerHTML = '';
};

// export default DOM object
export default notificationBar;
