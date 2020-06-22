import {Scene, Sprite} from 'verf';

export default class Start extends Scene {
    init ()
    {
        this.camera.x = 80;
        this.camera.y = 100;
        this.rps = this.add(new Sprite({name: 'rps', x: 80, y: 150, width: 16, height: 16}));
        this.rps.addAnimation({name: 's', frames: [0, 1, 2], fps: 8});
        this.rps.animation = 's';
        this.pointer.once('pointerdown', () => {
            this.engine.rps = this.rps.frame;
            this.engine.switchScene('level');
        });
    }
}
