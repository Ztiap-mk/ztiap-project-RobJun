class Particles extends RenderGroup{
    constructor(parent){
        super(parent);

    }

    createParticles(duration,color, scale){
        scale = scale || new vec2(1,1);
        var part = new Particle(this,
                                this.parent.center,
                                this.parent.angle,
                                duration,
                                color,
                                scale, 
                                [   0.0,0.0,
                                    0.025,-0.03,
                                    0.0,-0.1,
                                    -0.025,-0.03
                                ]);
        this.addObject(part);
    }

    createBulletPart(duration){
        var part = new BulletPartical(this,
                                        this.parent.center,
                                        this.parent.angle,
                                        duration,
                                        "red",
                                        new vec2(0.15,1), 
                                        [   0.035,0.01,
                                            0.0,-0.03,
                                            -0.035,0.01
                                        ]);
        this.addObject(part);
    }


    notify(message,object){
        var m = message.split("=");
        if(m[0] === "delete"){
            this.shiftFrom(object.index[object.index.length-1]);
        }
    }


}


class Particle extends Shape{
    constructor(parent, position, angle,life,color,scale, verts){
        super(parent,verts,
             undefined,{fillColor : color});

        this.alive = 0;
        this.angle = angle || 0;
        this.life = life || 1
        this.position = position;
        for(var i = 0; i < this.vertecies.length;i+=2){
            var vector = calculateVector({x : this.vertecies[i], y : this.vertecies[i+1]},calculateScaleMat(scale));
            this.vertecies[i] = vector.x;
            this.vertecies[i+1] = vector.y;
            vector = calculateVector(vector,calculateTranslate(position).multiply(calculateRotationMat(this.angle)));
            this.actualPosition[i] = vector.x;
            this.actualPosition[i+1] = vector.y;
        }
    }

    move(delta){
        this.alive+=delta;
        for(var i = 0; i < this.actualPosition.length;i+=2){
            var vector = calculateVector({x : this.vertecies[i], y : this.vertecies[i+1]},calculateTranslate(this.position).multiply(
                                                                                            calculateRotationMat(this.angle).multiply(
                                                                                                calculateScaleMat(new vec2(1-this.alive*3,1)))));
            this.actualPosition[i] = vector.x;
            this.actualPosition[i+1] = vector.y;
        }
        if(this.alive >= this.life) {
            this.notify("delete",this)
        }
    }
}

class BulletPartical extends Particle{
    constructor(parent, position, angle,life,color,scale , verts){
        super(parent, position, angle,life,color,scale, verts);
    }
    move(delta){
        this.alive+=delta;
        if(this.alive >= this.life) {
            this.notify("delete",this)
        }
    }

}
