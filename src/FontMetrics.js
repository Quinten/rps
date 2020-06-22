import {BitmapFontMetrics} from 'verf';
export default class FontMetrics extends BitmapFontMetrics {
    constructor()
    {
        super({
            chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ .,!?#1234567890+-='
        });
    }
}
