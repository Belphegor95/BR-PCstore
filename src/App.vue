<template>
  <router-view id="app" />
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-size: 0.75rem;
  color: #000;
}
#app > div {
  width: 100%;
}
#app > div > div {
  width: 75rem;
  margin: auto;
}
.nav {
  height: 2rem;
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
/* 提示框高度 */
.vl-notify.vl-notify-msg {
  height: 44px;
}
/* 退出登录提示框 */
.vl-notify.vl-notify-alert {
  height: 160px;
}
</style>
