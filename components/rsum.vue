<template>
  <text x=30 :y="100*(1*r+1)+60" stroke="red" font-size="40">{{d}}</text>
</template>
<script>
export default{
    props:["r","d"],
}
</script>

