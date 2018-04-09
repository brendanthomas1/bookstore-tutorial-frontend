<template>
  <div class='row'>
    <div class='col-12 col-md-3 border-right'>
      <Box :author='author' v-if='author'></Box>
    </div>
    <div class='col-12 col-md-9'>
      <List :author='author' v-if='author'></List>
    </div>
  </div>
</template>

<script>

import List from '@/components/Books/List';
import Box from './Box';

export default {
  name: 'Single',

  data() {
    return {
      author: null,
    };
  },

  created() {
    this.$http.get(`/authors/${this.$route.params.id}`)
      .then((request) => { this.author = request.data; })
      .catch(() => { console.error('Problem fetching data'); });
  },

  components: {
    Box,
    List,
  },
};

</script>

