import './index.html';
import './style.scss';
import App from './modules/app';

const app = new App();
app.createApp();
app.restartApp();
app.changeLvl();
app.changeMinesCount();
