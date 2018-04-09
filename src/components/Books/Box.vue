<template>
  <div class="col book text-center">
    <img :src="image" />
    <p>{{ book.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: ['book'],
  data() {
    return {
      image:
      `http://via.placeholder.com/200x200?text=${encodeURIComponent(this.book.title)}`,
    };
  },
  created() {
    this.pullImage();
  },
  methods: {
    async pullImage() {
      const response = await
      fetch(`http://api.duckduckgo.com/?q=${encodeURIComponent(this.book.title)}&format=json&pretty=1`);
      const json = await response.json();
      if (json.Image) {
        this.image = json.Image;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.book {
  min-width: 260px;

  img {
    object-fit: cover;
    width: 100%;
    height: 260px;
  }

  a {
    color: #23ce6b;
  }
}
</style>
