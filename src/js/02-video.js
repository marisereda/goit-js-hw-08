import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const THROTTLE_DELAY = 1000;

const playerEl = document.querySelector('#vimeo-player');
const player = new Player(playerEl);

const currentTime = localStorage.getItem(STORAGE_KEY);
if (currentTime) {
  player.setCurrentTime(currentTime);
}

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(STORAGE_KEY, data.seconds);
  }, THROTTLE_DELAY)
);
