import { ProductInterface } from "@/utils/interfaces";
import { makeAutoObservable, runInAction } from "mobx";

class Store {
  darkMode: boolean = false;
  cartItems: any[] = [];

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

  addItemToCart(newItem: ProductInterface) {
    const newCartItem = this.cartItems.map(item =>
      item.name === newItem.name ? { ...item, quantity: item.quantity + 1 } : item
    );
    const totalCartItems = [...this.cartItems, newCartItem];

    localStorage.setItem("cartItems", JSON.stringify([...this.cartItems, newCartItem]));

    console.log(totalCartItems);
    runInAction(() => {
      this.cartItems = totalCartItems;
    });
  }

  setInitialCartItems() {
    const getCarItems = localStorage.getItem("cartItems");
    runInAction(() => {
      this.cartItems = getCarItems ? JSON.parse(getCarItems) : [];
    });
  }
}

const store = new Store();
export default store;
