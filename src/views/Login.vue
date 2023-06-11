<template>
  <ion-page class="login-page">
    <div class="content">
      <img src="../assets/svg/login-logo.svg" alt="A-INSIGHTS logo" />
      <h2>Login</h2>
      <p>Not a customer? Return to our webite or <a href="">contact us</a></p>
      <form>
        <label for="E-mail">Email</label>
        <ion-input
          class="text-input"
          label="E-mail"
          label-placement="floating"
          placeholder="Enter your e-mail here"
          v-model="email"
        />
        <label for="Password">Password</label>
        <ion-input
          class="text-input"
          label="Password"
          label-placement="floating"
          placeholder="Enter your password here"
          type="password"
          v-model="password"
        />
        <ion-button class="button" color="white" @click="handleSignIn">
          <div v-if="result">
            <ion-spinner color="primary" name="circles"></ion-spinner>&nbsp;{{
              result
            }}
          </div>
          <div v-else>
            Login
            <ion-icon
              slot="end"
              aria-hidden="true"
              :icon="arrowForwardOutline"
            ></ion-icon>
          </div>
        </ion-button>
      </form>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonInput, IonButton, IonPage, IonSpinner, IonIcon } from "@ionic/vue";
import { signIn, useAppState } from "@/state/App";
import { useRouter } from "vue-router";
import { arrowForwardOutline } from "ionicons/icons";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const { ip } = useAppState();
    const router = useRouter();

    const result = ref();

    // Input refs
    const email = ref<string>();
    const password = ref<string>();

    return {
      email,
      password,
      ip,
      result,
      arrowForwardOutline,
      handleSignIn: async () => {
        result.value = "Getting you signed in!";
        if (email.value && password.value) {
          await signIn(ip.value, email.value, password.value);
          await router.replace({ path: "/home" });
        }
      },
    };
  },
  components: { IonInput, IonPage, IonButton, IonSpinner, IonIcon },
});
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  h1 {
    color: var(--white);
    font-size: 3rem;
    padding: 0.3125rem 0.625rem;
    font-weight: var(--font-weight-bold);
  }
  h2 {
    font-weight: var(--font-weight-light);
    color: var(--secondary-color);
    font-size: 2.5rem;
    text-align: center;
  }
  span {
    color: var(--secondary-color);
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  p {
    color: var(--white);
    text-align: center;
    :deep(a) {
      color: var(--secondary-color);
    }
  }
  label {
    color: var(--white);
    display: block;
  }
  label:after {
    content: ": ";
  }
  .text-input {
    margin-bottom: 1rem;
    height: var(--input-height);
    outline: none;
    border: 0.06rem solid var(--primary-color);
    width: 100%;
    text-indent: 1rem;
    border-radius: 0.25rem;
    background-color: var(--white);
    color: var(--black);
  }

  .button {
    background: var(--white);
    background-color: var(--white);
    width: fit-content;
    align-self: center;
    div {
      display: flex;
      color: var(--primary-color);
      align-items: center;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
  }
}
</style>

function useDataState(): { user: any; } { throw new Error("Function not
implemented."); } function useDataState(): { user: any; } { throw new
Error("Function not implemented."); } function useDataState(): { user: any; } {
throw new Error("Function not implemented."); }
