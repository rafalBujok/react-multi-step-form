# Produkty — wieloetapowy formularz dodawania produktu

Zadanie rekrutacyjne — trzyetapowy formularz dodawania produktu osadzony w oknie modalnym, z tabelą produktów i paginacją zsynchronizowaną z URL.

## Stack technologiczny

- **Vite + React 19 + TypeScript** — SPA
- **Tailwind CSS v4** — stylowanie
- **shadcn/ui** (na bazie Radix UI) — komponenty interfejsu
- **TanStack Form** — stan formularza i obsługa kroków
- **Zod** — schematy walidacji (osobny schemat per krok + schemat końcowy)
- **nuqs** — synchronizacja numeru strony tabeli z parametrem `?page=` w URL

## Uruchomienie lokalne

Wymagania: **Node.js 20+** (testowane na Node 24) oraz **pnpm** (jeśli nie masz: `corepack enable`).

```bash
pnpm install
pnpm dev
```

Aplikacja wystartuje pod adresem wypisanym w konsoli (domyślnie `http://localhost:5173`).

### Build produkcyjny

```bash
pnpm build
pnpm preview
```

