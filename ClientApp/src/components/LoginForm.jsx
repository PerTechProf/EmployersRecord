import React from 'react'


export const LoginForm = () => {
  return (
    <form>
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example1">Email </label>
        <input type="email" id="form2Example1" class="form-control" />
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example2">Пароль</label>
        <input type="password" id="form2Example2" class="form-control" />
      </div>

      <button type="button" class="btn btn-primary btn-block mb-4">Войти</button>

    </form>
  )
}