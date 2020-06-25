import {Scene, Sprite, BitmapText} from 'verf';

import FontMetrics from './FontMetrics.js';

export default class Start extends Scene {
    init ()
    {
        this.maxWidth = Math.min(this.viewport.width, this.viewport.height);
        this.camera.x = this.maxWidth/2;
        this.camera.y = this.viewport.height/2;
        this.rps = this.add(new Sprite({name: 'rps', x: this.maxWidth/2, y: this.viewport.height * 3 / 4, width: 16, height: 16}));
        this.rps.addAnimation({name: 's', frames: [0, 1, 2], fps: 8});
        this.rps.animation = 's';
        this.pointer.once('pointerdown', () => {
            this.startLevel();
        });
        this.keys.once('keyup', () => {
            this.startLevel();
        });
        this.keys.once('padup', () => {
            this.startLevel();
        });
        this.textA = this.add(new BitmapText({
            text: 'RPS\n\nTAP TO START!',
            x: this.maxWidth/2,
            y: this.viewport.height/4,
            font: 'font',
            fillStyle: this.engine.foreground,
            metrics: new FontMetrics()
        }));
    }

    startLevel()
    {
        this.engine.rps = this.rps.frame;
        this.engine.switchScene('level');
    }

    resize(w, h) {
        this.maxWidth = Math.min(w, h);
        this.camera.x = this.maxWidth/2;
        this.camera.y = h/2;
        this.rps.x = this.maxWidth/2;
        this.rps.y = h*3/4;
        this.textA.x = this.maxWidth/2;
        this.textA.y = h/4;
    }
}
