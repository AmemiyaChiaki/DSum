<template>
<div>
  <v-btn v-if="!started" @click="started=true">start</v-btn>
  <drsum v-if="user && started" :problems="problems" width="3" height="3"></drsum>
</div>
</template>

<script>
import drsum from "~/components/drsum.vue"
export default {
    data(){
	return {
	    started:false
	}
    },
  components: {
   drsum
  },
    computed:{
	user(){
	    return this.$store.state.user
	},
	problems(){
	    if(this.$store.state.problems){
		return this.$store.state.problems
	    }
	}
    }
	
}
</script>
