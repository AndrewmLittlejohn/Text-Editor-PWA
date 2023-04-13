const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// from 19-PWA/01-Activities/25-Ins_Manifest/assets/js/install.js
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  butInstall.style.visibility = 'visible';
  textHeader.textContent = 'Click the button to install!';

  butInstall.addEventListener('click', () => {
    event.prompt();
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
  });
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (window.beforeinstallprompt) {
    const promptEvent = window.beforeinstallprompt;
      promptEvent.prompt();
    
    const choice = await promptEvent.userChoice;
      if (choice.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('Install Promt Dismissed');
    };
  }
});

// TODO: Add an handler for the `appinstalled` event
// from 19-PWA/01-Activities/25-Ins_Manifest/assets/js/install.js
window.addEventListener('appinstalled', (event) => {
  textHeader.textContent = 'Successfully installed!';
  console.log('👍', 'appinstalled', event);
});
