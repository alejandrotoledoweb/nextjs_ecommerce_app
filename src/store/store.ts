import Cookies from "js-cookie";
import { makeAutoObservable, runInAction } from "mobx";

class Store {
  darkMode: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setDarkModeValue(value: string | null) {
    if (value === "ON") {
      this.setDarkModeOn();
    } else {
      this.setDarkModeOff();
    }
  }

  setDarkModeOn() {
    localStorage.setItem("darkMode", "ON");
    runInAction(() => {
      this.darkMode = true;
    });
  }

  setDarkModeOff() {
    localStorage.setItem("darkMode", "OFF");
    runInAction(() => {
      this.darkMode = false;
    });
  }
}

const store = new Store();
export default store;
