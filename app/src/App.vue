<template>
  <router-view @change-locale="changeLocale"/>
</template>

<script>

export default {

  methods: {
    changeLocale() {
      this.$i18n.locale = (this.$i18n.locale === 'ja') ? 'en' : 'ja';
    }
  }
}
</script>