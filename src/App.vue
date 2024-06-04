<template>
  <div id="app">
    <div class="container">
      <section class="section">
        <h1>Posts</h1>
        <ul class="posts">
          <li v-for="post in posts" :key="post.id" class="post-item">
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <button @click="deletePost(post.id)">Delete</button>
          </li>
        </ul>
        <form @submit.prevent="addPost">
          <input type="text" v-model="newPost.title" placeholder="Title">
          <textarea v-model="newPost.content" placeholder="Content"></textarea>
          <button type="submit">Post</button>
        </form>
      </section>

      <section class="section">
        <h1>Comments</h1>
        <ul class="comments">
          <li v-for="comment in comments" :key="comment.id" class="comment-item">
            <p>{{ comment.content }}</p>
            <button @click="deleteComment(comment.id)">Delete</button>
          </li>
        </ul>
        <form @submit.prevent="addComment">
          <textarea v-model="newComment.content" placeholder="Add a comment"></textarea>
          <button type="submit">Comment</button>
        </form>
      </section>

      <section class="section">
        <h1>Profile</h1>
        <div v-if="profile" class="profile">
          <p><strong>Name:</strong> {{ profile.name }}</p>
          <p><strong>Age: 20</strong> {{ profile.age }}</p>
          <p><strong>Email: rehantifanno@gmail.com</strong> {{ profile.email }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const posts = ref([])
    const comments = ref([])
    const profile = ref(null)
    const newPost = ref({ title: '', content: '' })
    const newComment = ref({ content: '' })

    onMounted(async () => {
      // Fetch posts
      let response = await fetch('http://localhost:3000/posts')
      posts.value = await response.json()

      // Fetch comments
      response = await fetch('http://localhost:3000/comments')
      comments.value = await response.json()

      // Fetch profile
      response = await fetch('http://localhost:3000/profile')
      profile.value = await response.json()
    })

    const addPost = async () => {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost.value)
      })

      if (response.ok) {
        const postData = await response.json()
        posts.value.push(postData)
        newPost.value = { title: '', content: '' }
      }
    }

    const deletePost = async (postId) => {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        posts.value = posts.value.filter(post => post.id !== postId)
      }
    }

    const addComment = async () => {
      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment.value)
      })

      if (response.ok) {
        const commentData = await response.json()
        comments.value.push(commentData)
        newComment.value = { content: '' }
      }
    }

    const deleteComment = async (commentId) => {
      const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        comments.value = comments.value.filter(comment => comment.id !== commentId)
      }
    }

    return {
      posts,
      comments,
      profile,
      newPost,
      newComment,
      addPost,
      deletePost,
      addComment,
      deleteComment
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 20px;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 40px;
}

h1 {
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.posts, .comments {
  margin: 0;
  padding: 0;
}

.post-item, .comment-item {
  background-color: #f9f9f9;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.post-item h2 {
  margin: 0 0 10px;
  color: #333;
}

.profile p {
  margin: 10px 0;
}

form {
  margin-top: 20px;
}

form textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #2c7a63;
}
</style>
