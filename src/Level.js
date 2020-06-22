import {Scene, Sprite, Body} from 'verf';
import Npc from './Npc.js';

export default class Level extends Scene {
    init ()
    {
        this.camera.x = 80;
        this.camera.y = 100;
        this.player = this.add(new Sprite({name: 'rps', x: 80, y: 150, width: 16, height: 16, frame: this.engine.rps}).addBody(new Body()));
        this.player.homeX = this.player.x;
        this.camera.flash({color: this.engine.foreground});
        this.pointer.on('pointerdown', (e) => {
            if (e.worldX > 0 && e.worldX < 160) {
                this.player.homeX = e.worldX;
            }
        });
        this.npcs = [];
        this.startY = -50;
        for (let n = 0; n < 6; n++) {
            let npc = this.add(new Npc({name: 'rps', x: 16 + Math.random() * 128, y: this.startY, width: 16, height: 16, frame: this.getRF()}).addBody(new Body()));
            npc.body.vy = 100;
            this.world.addCollider({a: this.player, b: npc, callback: () => {
                if (!npc.visible || !this.player.visible) {
                    return;
                }
                let playerWins = false;
                switch (this.player.frame) {
                    case 0:
                        playerWins = npc.frame == 2;
                        break;
                    case 1:
                        playerWins = npc.frame == 0;
                        break;
                    case 2:
                        playerWins = npc.frame == 1;
                        break;
                }
                if (playerWins) {
                    npc.visible = false;
                } else {
                    this.player.visible = false;
                    this.engine.setTimeout(() => {
                        this.engine.switchScene('start');
                    }, 2000);
                }
                this.camera.shake();
            }, seperate: false});
            this.npcs.push(npc);
            this.startY -= 50;
        }
    }

    update(time, delta)
    {
        if (!this.active) {
            return;
        }
        this.player.body.vx = (this.player.homeX - this.player.x) / 2 * 30;
        this.npcs.forEach((npc) => {
            if (npc.body.top > 200) {
                npc.body.y -= 300;
                npc.body.x = this.player.body.x;
                npc.frame = this.getRF();
                npc.visible = true;
            }
        });
    }

    getRF()
    {
        let opt = [0, 1, 2].filter((o) => o !== this.engine.rps);
        return opt[Math.floor(Math.random() * 2)];
    }
}
