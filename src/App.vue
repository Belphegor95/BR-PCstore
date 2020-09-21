<template>
  <router-view id="app" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  color: #000;
  /* background-color: #fff; */
}
#app > div {
  width: 100%;
}
#app > div > div {
  width: 75rem;
  margin: auto;
}
.nav {
  height: 38px;
  background-color: #f1f1f1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button {
  background-color: #fff;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
}
li {
  list-style: none;
}
input {
  outline: none;
}

.vl-notify.vl-notify-msg {
  height: 44px;
}
</style>
