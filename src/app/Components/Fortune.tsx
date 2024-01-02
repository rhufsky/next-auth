"use client";

import { useEffect, useState } from "react";
import { getFortuneClient } from "../api/fortune/fortuneClient";

export default function Fortune() {
  const [message, setMesssage] = useState("");

  const loadFortuneCookie = async () => {
    try {
      return getFortuneClient();
    } catch (error) {
      return "network error !!";
    }
  };

  useEffect(() => {
    loadFortuneCookie()
      .then((message) => setMesssage(message))
      .catch((message) => setMesssage(message));
  }, []);

  return <p className="py-4">{message}</p>;
}
