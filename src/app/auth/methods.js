import auth from "@react-native-firebase/auth";

export const login = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.log("Login error:", e);
  }
};
export const register = async (email, password) => {
  try {
    return await auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.log("Register error:", e);
  }
};
export const logout = async () => {
  try {
    console.log('dang dang xuat')
    await auth().signOut();
  } catch (e) {
    console.log("Logout error:", e);
  }
};
