<template>
<div/>
</template>

<script>

export default {
  mounted() {
    const route = this.$route
    const hash = route.hash
    const u = hash.split("=")[1]
    const path = hash.split("/")[1].split("?")[0]
    this.$router.push(
        this.localePath({
          name: path || "index",
          query: {
            u
          },
        })
      )
    }
};
</script>
