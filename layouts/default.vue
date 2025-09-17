<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink> | <NuxtLink to="/article/1">Article 1</NuxtLink> |
        <NuxtLink to="/article/2">Article 2</NuxtLink> |
        <NuxtLink to="/article/3">Article 3</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <small>&copy; 2025 Demo</small>
    </footer>
  </div>
</template>

<script setup>
// No script needed for basic layout
</script>
