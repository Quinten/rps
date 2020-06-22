import {VerfGame, Pointer, World} from 'verf';
import Start from './Start.js';
import Level from './Level.js';
import ClipPlugin from './ClipPlugin.js';

const game = new VerfGame({
    background: '#639fab',
    foreground: '#fcfff7',
    width: 160,
    height: 200,
    assets: [
        {name: 'font', type: 'image', src: 'font.png'},
        {name: 'rps', type: 'image', src: 'rps.png'}
    ],
    scenes: [
        {name: 'start', class: Start},
        {name: 'level', class: Level}
    ],
    plugins: [
        {name: 'clip', class: ClipPlugin, type: 'scene'},
        {name: 'world', class: World, type: 'scene'},
        {name: 'pointer', class: Pointer, type: 'scene'}
    ]
});
