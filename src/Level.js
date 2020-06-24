import {Scene, Sprite, Body, BitmapText} from 'verf';
import Npc from './Npc.js';
import FontMetrics from './FontMetrics.js';
const tm = require('tinymusic');
const ac = typeof AudioContext !== 'undefined' ? new AudioContext() : new webkitAudioContext();

const notes = ['D3 q', 'E3 q', 'F3 q', 'A3 q', 'B3 q'];
let noteIndex = 4;

export default class Level extends Scene {
    init ()
    {
        this.maxWidth = Math.min(this.viewport.width, this.viewport.height);
        noteIndex = 0;
        this.score = 0;
        this.highscore = Number(localStorage.getItem('rpsscore'));
        this.camera.x = this.maxWidth / 2;;
        this.camera.y = this.viewport.height / 2;
        this.player = this.add(new Sprite({name: 'rps', x: this.maxWidth/2, y: this.viewport.height*3/4, width: 16, height: 16, frame: this.engine.rps}).addBody(new Body()));
        this.player.homeX = this.player.x;
        this.camera.flash({color: this.engine.foreground});
        this.pointer.on('pointerdown', (e) => {
            if (e.worldX > 0 && e.worldX < this.maxWidth) {
                this.player.homeX = e.worldX;
            }
            if (ac.state === 'suspended') {
                ac.resume();
            }
        });
        this.npcs = [];
        this.startY = -50;
        for (let n = 0; n < 9; n++) {
            let npc = this.add(new Npc({name: 'rps', x: 16 + Math.random() * (this.maxWidth - 32), y: this.startY, width: 16, height: 16, frame: this.getRF()}).addBody(new Body()));
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
                    this.score += 1;
                    this.scoreText.text = 'SCORE\n' + this.score;
                    if (this.score > this.highscore) {
                        this.highscore  = this.score;
                        localStorage.setItem('rpsscore', this.highscore);
                        this.highscoreText.text = 'HISCORE\n' + this.highscore;
                    }
                    noteIndex++;
                    if (noteIndex >= notes.length) {
                        noteIndex = 0;
                    }
                    this.playSequence([notes[noteIndex]]);
                } else {
                    this.player.visible = false;
                    this.engine.setTimeout(() => {
                        this.engine.switchScene('start');
                    }, 2000);
                    this.playSequence(['B3 s', 'A3 es', 'F3 e', 'E3 e', 'D3 w']);
                }
                this.camera.shake();
            }, seperate: false});
            this.npcs.push(npc);
            this.startY -= 50;
        }
        this.scoreText = this.add(new BitmapText({
            text: 'SCORE\n0',
            x: 0,
            y: 0,
            font: 'font',
            fillStyle: this.engine.foreground,
            metrics: new FontMetrics(),
            textAlign: 'left'
        }));
        this.highscoreText = this.add(new BitmapText({
            text: 'HISCORE\n' + this.highscore,
            x: this.maxWidth,
            y: 0,
            font: 'font',
            fillStyle: this.engine.foreground,
            metrics: new FontMetrics(),
            textAlign: 'right'
        }));
    }

    update(time, delta)
    {
        if (!this.active) {
            return;
        }
        this.player.body.vx = (this.player.homeX - this.player.x) / 2 * 30;
        this.npcs.forEach((npc) => {
            if (npc.body.top > this.viewport.height) {
                npc.body.y -= 450;
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

    playSequence(seq)
    {
        let sequence = new tm.Sequence( ac, 120, seq);
        sequence.loop = false;
        sequence.gain.gain.value = .25;
        sequence.staccato = 0.55;
        sequence.play(ac.currentTime);
    }

    resize(w, h) {
        this.maxWidth = Math.min(w, h);
        this.camera.x = this.maxWidth/2;
        this.camera.y = h/2;
        this.player.body.y = h*3/4 - 8;
        this.highscoreText.x = this.maxWidth;
    }
}
