<template>
  <text :x="100*(1*c+1)+60" y="50" stroke="red" font-size="40">{{d}}</text>
</template>
<script>
export default{
      props:["c","d"],
}
</script>
