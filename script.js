document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.dance-background video');
    const muteButton = document.getElementById('mute-button');
    const muteIcon = document.getElementById('mute-icon');

    muteButton.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            muteIcon.src = 'unmute.svg'; // Change to unmute icon
        } else {
            video.muted = true;
            muteIcon.src = 'mute.svg'; // Change to mute icon
        }
    });
});
