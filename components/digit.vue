<template>
<g :transform="idou" @mousedown="start($event)" @mousemove="move($event)" @mouseup="finish($event)">
  <rect 
    x=0 y=0 width="100" height="100" :fill="becolor" stroke="red">
  </rect>
  <text x=40 y=60 stroke="blue" font-size="40">{{d}}</text>
</g>
</template>
<script>

export default{
    props:["r","c","d"],
    data(){
	return{
	    isMouseDown:false,
	    prevX:0,
	    prevY:0,
	    x:0,
	    y:0,
	}
    },
    computed:{
	idou(){
	    return "translate("+(this.x+100*this.c)+","+(this.y+100*this.r)+")"
	},
	becolor(){
	    if(this.isMouseDown){
		return "red"
	    }else{
		return "white"
	    }
	}
    },
    methods:{
	start(e){
	    console.log(e)
	    //this.$emit('start',{r:this.r,c:this.c})
	    //this.$store.commit('dragStart')
	    this.isMouseDown=true
	    this.prevX=e.offsetX
	    this.prevY=e.offsetY
	    this.$emit('start',{r:this.r,c:this.c})

	},
	move(e){
	    if(this.isMouseDown){
		let deltaX=e.offsetX-this.prevX
		let deltaY=e.offsetY-this.prevY
		this.x+=deltaX
		this.y+=deltaY
		this.prevX=e.offsetX
		this.prevY=e.offsetY
	    }
	},
	finish(e){
	    this.isMouseDown=false
	    this.x=Math.round(this.x/100)*100
	    this.y=Math.round(this.y/100)*100
	    this.$emit("moveend",{dc:this.x/100,dr:this.y/100})
	    this.x=0
	    this.y=0
	}
    }
}
</script>
