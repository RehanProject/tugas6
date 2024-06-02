<template>
  <div class="container">
    <form @submit.prevent="save" class="form">
      <input type="text" v-model="form.title" placeholder="Title" class="input"/><br />
      <textarea v-model="form.content" placeholder="Content" class="textarea"></textarea><br />
      <button type="submit" class="btn btn-save">Save</button>
    </form>
    <ul class="article-list">
      <li v-for="article in articles" :key="article.id" class="article-item">
        <h3>{{ article.title }}</h3>
        <p>{{ article.content }}</p>
        <button @click="edit(article)" class="btn btn-edit">Edit</button>
        <button @click="del(article.id)" class="btn btn-delete">Delete</button>
      </li>
    </ul>
    <button @click="load" class="btn btn-load">Load</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const form = reactive({
      title: '',
      content: '',
    });

    const articles = ref([]);
    const deletedArticleIds = ref([]);

    async function save() {
      try {
        const url = 'http://localhost:3000/articles';
        const method = 'post';
        const response = await axios({ url, method, data: form });
        
        articles.value.push(response.data);

        form.title = '';
        form.content = '';
      } catch (error) {
        console.error('Error saving article:', error);
      }
    }

    async function del(id) {
      console.log('Delete button clicked for article with ID:', id);
      try {
        await axios.delete(`http://localhost:3000/articles/${id}`);
        articles.value = articles.value.filter(article => article.id !== id);
        deletedArticleIds.value.push(id); // Tambahkan ID artikel yang dihapus ke dalam deletedArticleIds
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }

    function edit(article) {
      form.title = article.title;
      form.content = article.content;
    }

    async function load() {
      try {
        let deletedArticles = [];

        if (deletedArticleIds.value.length > 0) {
          const response = await axios.get('http://localhost:3000/articles');
          deletedArticles = response.data.filter(article => deletedArticleIds.value.includes(article.id));
        }

        const response = await axios.get('http://localhost:3000/articles');
        articles.value = response.data.concat(deletedArticles);

        console.log('Articles loaded successfully:', articles.value);
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    }

    return { form, articles, save, del, load, edit };
  },
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form {
  margin-bottom: 20px;
}

.input, .textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 15px;
  margin: 5px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-load {
  background-color: #ff9800;
  color: white;
}

.article-list {
  list-style-type: none;
  padding: 0;
}

.article-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.article-item h3 {
  margin: 0 0 10px;
  color: black; /* Ubah warna tulisan menjadi hitam */
}

.article-item p {
  margin: 0 0 10px;
  color: black; /* Ubah warna tulisan menjadi hitam */
}
</style>
