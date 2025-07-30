<template>
  <div class="app-container">
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      <span> © 2025 Habit Tracker. Made by Justinas Steikunas.</span>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
}

.app-footer {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  background: rgb(0 0 0 / 5%);
  color: #333;
  font-size: 0.95rem;
  margin-top: auto;
}
</style>
