import './index.html';
import './style.scss';
import App from './modules/app';
import { setResDBLocalStorage } from './modules/results-data-base';

const app = new App();
app.createApp();
app.restartApp();
app.changeLvl();
app.changeMinesCount();
setResDBLocalStorage();
