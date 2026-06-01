// Simple test: call /login then /newOrder using fetch (Node 18+)
(async () => {
  try {
    const API = process.env.API_URL || "http://localhost:3002";

    console.log("Calling /login...");
    const loginRes = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "demo@demo.com", password: "demo" }),
    });

    const loginJson = await loginRes.json();
    if (!loginRes.ok) {
      console.error("Login failed:", loginJson);
      process.exit(2);
    }

    const { token } = loginJson;
    console.log("Login OK, token length:", token?.length || 0);

    console.log("Calling /newOrder with token...");
    const orderRes = await fetch(`${API}/newOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ qty: 1, price: 12.5, mode: "BUY" }),
    });

    const orderJson = await orderRes.json();
    if (!orderRes.ok) {
      console.error("Order failed:", orderJson);
      process.exit(3);
    }

    console.log("Order result:", orderJson);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
