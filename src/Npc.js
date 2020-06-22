import {Sprite} from 'verf';

export default class Npc extends Sprite {
    draw(context) {
        context.rotate(Math.PI);
        super.draw(context);
    }
}
