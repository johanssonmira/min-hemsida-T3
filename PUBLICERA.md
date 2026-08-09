# Så lägger du upp sidan på nätet

Appen är redan förberedd och incheckad lokalt. Det som återstår är att skicka upp
den till GitHub och slå på GitHub Pages. Räkna med fem minuter.

---

## Steg 1 – Skicka upp koden

Öppna en terminal i den här mappen (`sysb23-plugg`) och kör:

```bash
git push -u origin main
```

Första gången frågar Git efter inloggning. Två alternativ:

**Om ett webbläsarfönster öppnas:** logga in med ditt GitHub-konto och godkänn. Klart.

**Om den frågar efter användarnamn och lösenord i terminalen:** ditt vanliga
GitHub-lösenord fungerar inte längre. Du behöver en så kallad *personal access token*:

1. Gå till <https://github.com/settings/tokens>
2. Klicka **Generate new token** → **Generate new token (classic)**
3. Sätt **Note** till `sysb23-plugg` och **Expiration** till exempelvis 90 dagar
4. Kryssa i rutan **repo**
5. Klicka **Generate token** längst ner
6. Kopiera token-strängen direkt — den visas bara en gång

När Git frågar:
- **Username:** `johanssonmira1`
- **Password:** klistra in token-strängen

---

## Steg 2 – Slå på GitHub Pages

1. Gå till <https://github.com/johanssonmira1/sysb23-plugg-2026>
2. Klicka **Settings** högst upp
3. Välj **Pages** i menyn till vänster
4. Under **Source**, välj **Deploy from a branch**
5. Under **Branch**, välj `main` och mappen `/ (root)`
6. Klicka **Save**

Vänta en till två minuter. Sidan hamnar på:

**https://johanssonmira1.github.io/sysb23-plugg-2026/**

Ladda om sidan i Settings → Pages om länken inte dyker upp direkt.

---

## Steg 3 – Lägg till den på mobilen

Öppna länken i mobilen och spara den som en app-ikon:

- **iPhone (Safari):** tryck på dela-ikonen → *Lägg till på hemskärmen*
- **Android (Chrome):** tryck på trepunktsmenyn → *Lägg till på startskärmen*

Då öppnas den i helskärm utan adressfält, precis som en vanlig app.

---

## Att uppdatera sidan senare

När du ändrat något — lagt till en fråga, rättat en text — kör:

```bash
git add -A
git commit -m "Beskriv kort vad du ändrat"
git push
```

Sidan uppdateras automatiskt inom en minut eller två.

---

## Viktigt om kursmaterialet

Mappen `sysb23-kursmaterial/` ligger kvar på din dator men skickas **aldrig** upp.
Den står i `.gitignore` eftersom föreläsningar, artiklar och gamla tentor är
upphovsrättsskyddade och inte får spridas publikt.

Appen fungerar utan mappen. Den behövs bara som källa när du eller jag skriver
nya frågor.

**Rör inte den raden i `.gitignore`.** Kontrollera med det här kommandot att inget
kursmaterial ligger med — det ska inte skriva ut någonting alls:

```bash
git ls-files sysb23-kursmaterial
```

---

## Om du vill ha sidan privat istället

Ett publikt repo betyder att vem som helst kan läsa koden och kompendiet.
Vill du hellre hålla det för dig själv:

1. Gå till **Settings** → längst ner under **Danger Zone**
2. Välj **Change repository visibility** → **Make private**

Notera dock att GitHub Pages på privata repon kräver ett betalkonto. Med gratiskontot
måste repot vara publikt för att sidan ska fungera. Alternativet är att fortsätta köra
lokalt med `node serve.js`.

---

## Om något strular

**"Updates were rejected because the remote contains work that you do not have locally"**

Repot på GitHub har något som saknas lokalt. Kör:

```bash
git pull --rebase origin main
git push
```

**Sidan visar 404**

Kontrollera att `index.html` ligger i rotmappen på GitHub och att du valt
`/ (root)` och inte `/docs` under Pages.

**Sidan visar bara rubriken men inget innehåll**

Något datafilnamn i `index.html` stämmer inte med filerna i `data/`. Öppna
utvecklarkonsolen i webbläsaren med F12 och titta efter röda 404-rader.
