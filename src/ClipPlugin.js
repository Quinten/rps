import {ScenePlugin} from 'verf';

export default class ClipPlugin extends ScenePlugin {
    postRender(context, time, delta)
    {
        context.save();
        context.globalCompositeOperation = 'destination-in';
        context.fillRect(Math.round(-this.scene.offset.x), Math.round(-this.scene.offset.y), 160, 200);
        context.restore();
    }
}
