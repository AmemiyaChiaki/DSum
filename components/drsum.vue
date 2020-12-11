<template>
<div>
  <svg width="500" height="500">
    <rect x=0 y=0 width="500" height="500" stroke="black"></rect>
    <rect x=100 y=100 :width="width*100" :height="height*100" stroke="white"></rect>
    <digit v-for="(o,i) in order"
	   :key="i"
	   @start="toFront($event)"
	   :r="haichi[o].r"
	   :c="haichi[o].c"
	   :d="haichi[o].d"
	   @moveend="swap($event,i)"></digit>
    <rsum v-for="(s,i) in rsums" :r="i" :d="s"></rsum>
    <csum v-for="(s,i) in csums" :c="i" :d="s"></csum>
    <text v-if="completed()" x=100 y=400 fill="red" stroke="red" font-size=50>clear</text>
  </svg>
</div>

</template>

<script>
import digit from "~/components/digit.vue"
import rsum from "~/components/rsum.vue"
import csum from "~/components/csum.vue"
export default{
    //props:["width","height","problems"],
    data(){
	return{
	    rsums:null,
	    csums:null,
	    haichi:null,
	    height:null,
	    width:null,
	    keys:[],
	    order:[]
	  
	}
    },
    created(){
	this.rsums=this.problems[this.stage].rsums
	this.csums=this.problems[this.stage].csums
	this.haichi=JSON.parse(JSON.stringify(this.problems[this.stage].haichi))
	this.height=this.problems[this.stage].rsums.length
	this.width=this.problems[this.stage].csums.length
	for(let h in this.haichi){
	    this.order.push(h)
	}

    },
    components:{
	digit,rsum,csum
    },
    methods:{
	swap(e,i){
	    console.log(e)
	    let h=this.haichi[i]
	    const newr=e.dr+h.r
	    const newc=e.dc+h.c
	    const j=this.haichi.findIndex((el)=>(el.r==newr&&el.c==newc))
	    this.haichi.splice(i,1,{r:e.dr+h.r,c:e.dc+h.c,d:h.d})
	    if(j!=-1){
		this.haichi.splice(j,1,{r:h.r,c:h.c,d:this.haichi[j].d})
	    }
	},
	completed(){
	    if(!this.haichi){
		return false
	    }
	    const rsum=[]
	    const csum=[]
	    for(let i=0;i<this.height;i++){
		rsum.push(0)
	    }
	    for(let i=0;i<this.width;i++){
		csum.push(0)
	    }
	    for(let p of this.haichi){
		rsum[p.r-1]+=p.d
		csum[p.c-1]+=p.d
	    }
	    console.log(rsum,csum)
	    if(JSON.stringify(rsum)==JSON.stringify(this.rsums)&&
	       JSON.stringify(csum)==JSON.stringify(this.csums)){
		return true
	    }else{
		return false
	    }
	},
	toFront(ev){
	    
	    console.log(ev)
	    const i=this.haichi.findIndex((el)=>(el.r==ev.r&&el.c==ev.c))
	    const j=this.order.indexOf(this.haichi.length-1)
	    console.log(i,j)
	    this.order.splice(j,1,this.order[i])
	    this.order.splice(i,1,this.haichi.length-1)
	    /*const top=this.haichi[i]
	    this.haichi.splice(i,1)
	    this.haichi.push(top)*/
	}
	
    },
    computed:{
	stage(){
	    return this.$store.state.stage
	},
	problems(){
	    if(this.$store.state.problems){
		return this.$store.state.problems
	    }
	}
    }
	
}
</script>
