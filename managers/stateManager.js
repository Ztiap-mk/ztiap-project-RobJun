class StateManager{
    constructor(){
        this.states = new Array();
        this.current = NaN;
    }

    set addState(state){
        this.states.push(state);
        state.index = this.states.length-1;
        return this.states.length-1;
    }

    set change(index){
        this.current = this.states[index];
    }


    render(context){
        this.current.render(context);
    }
}

class State{
    constructor(objects,renderCallback){
        this.index = -1;
        this.objects = objects; 
        this.callback = renderCallback;
    }

    addObjects(objects){
        this.objects.push(objects);
    }


    render(context){
        this.callback(context,this.objects);
    }
}