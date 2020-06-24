import {GameObject, Body} from 'verf';

export default class Particle extends GameObject {
    constructor(config)
    {
        super(config);
        this.fillStyle = '#fcfff7';
        this.width = 1 + Math.floor(Math.random() * 2);
        this.height = this.width;
        this.lifespan = 750 + Math.random() * 750;
        this.addBody(new Body());
    }

    addBody(body)
    {
        super.addBody(body);
        this.body.vx = -120 + Math.random() * 240;
        this.body.vy = -60 + Math.random() * 120;
        return this;
    }
}
