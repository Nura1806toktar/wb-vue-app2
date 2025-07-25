<template>
  <div class="container py-4">
    <h1 class="text-center mb-4">WB Test App</h1>

    <nav class="nav justify-content-center mb-4">
      <router-link to="/orders" class="nav-link btn btn-outline-primary mx-1">Orders</router-link>
      <router-link to="/sales" class="nav-link btn btn-outline-success mx-1">Sales</router-link>
      <router-link to="/incomes" class="nav-link btn btn-outline-warning mx-1">Incomes</router-link>
      <router-link to="/stocks" class="nav-link btn btn-outline-info mx-1">Stocks</router-link>
    </nav>

    <router-view />
  </div>
</template>
