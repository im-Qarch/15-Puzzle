<template>
  <main min-h-600px font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <!-- App Section -->
    <RouterView />
    <!-- Footer -->
    <nav text-xl mt-6 inline-flex gap-2>
      <button icon-btn @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </button>

      <a
        icon-btn i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/antfu/vitesse-lite"
        target="_blank"
        title="GitHub"
      />
    </nav>
  </main>
</template>
