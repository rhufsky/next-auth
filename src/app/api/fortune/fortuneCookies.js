"use server";
import fortune from "fortune-messages";

export async function getFortuneCookie() {
  return {
    fortune: fortune(),
  };
}
