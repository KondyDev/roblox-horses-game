# Roblox TS Template

This is my starter template for building Roblox games with **TypeScript + Rojo + Roblox-TS**

---

## **How to use it?**

### **1. Create a new repo with this template**

- Click **"Use this template"** on GitHub
- Name your repo (for exaple 'my-game')

Or clone it directly with degit:

```bash
npx degit KondyDev/roblox-ts-template my-game
cd my-game
```

---

### **2. Install dependencies**

```bash
npm install
```

---

### **3. Run development**

Start TypeScript watcher:

```bash
npm run watch
```

Run Rojo to sync with Roblox Studio:

```bash
rojo serve
```

---

### **4. Project structure**

```plaintext
src/
 ├─ client/    # Client-side scripts
 │   └─ main.client.ts
 ├─ server/    # Server-side scripts
 │   └─ main.server.ts
 └─ shared/    # Shared code for client & server
     └─ module.ts

```

After compilation, the **Lua files are generated inside the `out/` folder**.

---

## **Commands**

- `npm run build` – compile TypeScript once.
- `npm run watch` – compile TypeScript continuously.
- `rojo serve` – start Rojo server (for live sync with Studio).
- `rojo build -o game.rbxlx` – build the project into a `.rbxlx` file.

---

## **Requirements**

- **Node.js + npm**
- **Roblox Studio + Rojo Plugin**
- **Rojo CLI** (install via `cargo install rojo` or from [Releases](https://github.com/rojo-rbx/rojo/releases))
- **VS Code** (recommended extensions: _Roblox LSP_, _Prettier_, _ESLint_)

---

## **Author**

Template by **Kondy**.
