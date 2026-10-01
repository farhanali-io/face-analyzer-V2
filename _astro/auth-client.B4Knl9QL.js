export const authClient = {
  signIn: {
    social: async ({ provider, callbackURL }) => {
      console.log(`Social sign-in with ${provider}`);
      window.location.href = callbackURL || "/account";
    }
  },
  signOut: async () => {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {}
    window.location.href = "/login";
  },
  getSession: async () => {
    try {
      const res = await fetch("/api/session");
      return await res.json();
    } catch {
      return { configured: false, user: null };
    }
  }
};

export { authClient as t };
