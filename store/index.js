import firebase from '~/plugins/firebase.js'

const db=firebase.firestore()
const problemsRef=db.collection('problems')
export const state=()=>({
    isMouseDown:false,
    user:null,
    problems:null,
    stage:0
})

export const mutations={
    dragStart(state){
	state.isMouseDown=true
    },
    setUser(state,user){
	console.log(user)
	state.user={email:user.email,namae:user.displayName}
	//console.log(user)
    },
    clearUser(state){
	state.user=null
    },
    setProblems(state,problems){
	console.log(problems)
	state.problems=problems
    }
    
}

export const actions={
    login({commit,dispatch}){
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	    console.log(result.user)
	    commit('setUser',result.user)
	    dispatch('fetchProblems')
	})
	
    },
    logout({commit,dispatch}){
	firebase.auth().signOut().then(function(result){
	    commit('clearUser')
	})
    },
    fetchProblems({commit}){
	problemsRef.onSnapshot(snapshot=>{
	    const test=[]
	    snapshot.forEach((doc)=>{
		let haichi=JSON.parse(doc.data().haichi)
		let csums=JSON.parse(doc.data().csums)
		let rsums=JSON.parse(doc.data().rsums)
		test.push({haichi:haichi,rsums:rsums,csums:csums})
	    })
	    commit('setProblems',test)
	})
    }
}
