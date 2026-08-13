# Så lägger du upp sidan på nätet

Repot heter **min-hemsida-T3** och ligger på ditt GitHub-konto:
<https://github.com/johanssonmira/min-hemsida-T3>

Appen ligger uppe och sidan är i drift. Så här gör du när du ändrat något.


---

## Steg 1 – Skicka upp en ändring

Öppna en terminal i mappen `sysb23-plugg` och kör:

```bash
git add -A
git commit -m "Beskriv kort vad du ändrat"
git push
```

Sidan uppdaterar sig själv inom en till två minuter. Ser den gammal ut:
ladda om hårt med `Ctrl + Shift + R`.

Om Git frågar efter inloggning: se **Om inloggningen krånglar** längst ner.

---

## Steg 2 – Pages

Redan påslaget. Det här behöver du bara om något slutar fungera:

1. Gå till <https://github.com/johanssonmira/min-hemsida-T3>
2. Klicka **Settings** högst upp
3. Välj **Pages** i menyn till vänster
4. Under **Source**, välj **Deploy from a branch**
5. Under **Branch**, välj `main` och mappen `/ (root)`
6. Klicka **Save**

Vänta en till två minuter. Sidan hamnar på:

**https://johanssonmira.github.io/min-hemsida-T3/**

Står det redan så under Pages är det påslaget sedan tidigare — då räcker
steg 1, och sidan uppdaterar sig själv inom någon minut efter varje push.

---

## Steg 3 – Lägg den på mobilen

Öppna länken i mobilen och spara den som en app-ikon:

- **iPhone (Safari):** tryck på dela-ikonen → *Lägg till på hemskärmen*
- **Android (Chrome):** tryck på trepunktsmenyn → *Lägg till på startskärmen*

Då öppnas den i helskärm utan adressfält, precis som en vanlig app.

Statistiken sparas i webbläsaren, inte på nätet. Det du övat på datorn
följer alltså inte med till mobilen — de räknar var för sig. Vill du flytta
över: **Statistik → Spara kopia** på den ena, **Läs in kopia** på den andra.

---

## Viktigt om kursmaterialet

Mappen `sysb23-kursmaterial/` ligger kvar på din dator men skickas **aldrig**
upp. Den står i `.gitignore` eftersom föreläsningar, artiklar och gamla tentor
är upphovsrättsskyddade och inte får spridas publikt.

Appen fungerar utan mappen. Den behövs bara som källa när nya frågor skrivs.

**Rör inte den raden i `.gitignore`.** Kontrollera före varje push att inget
kursmaterial ligger med — kommandot ska inte skriva ut någonting alls:

```bash
git ls-files sysb23-kursmaterial
```

Tänk också på att ett publikt repo betyder att vem som helst kan läsa
kompendiet. Texterna är skrivna för appen, men de bygger på kurslitteraturen.
Vill du hellre hålla det för dig själv får du välja mellan att köra lokalt med
`node serve.js` eller att betala för GitHub Pages på privat repo — gratiskontot
kräver att repot är publikt för att sidan ska fungera.

---

## Om inloggningen krånglar

Ditt vanliga GitHub-lösenord fungerar inte i terminalen. Öppnas ett
webbläsarfönster loggar du bara in där. Frågar den efter användarnamn och
lösenord behöver du en *personal access token*:

1. Gå till <https://github.com/settings/tokens>
2. **Generate new token** → **Generate new token (classic)**
3. **Note:** `min-hemsida-T3`, **Expiration:** exempelvis 90 dagar
4. Kryssa i rutan **repo**
5. **Generate token** längst ner
6. Kopiera strängen direkt — den visas bara en gång

När Git frågar:
- **Username:** `johanssonmira`
- **Password:** klistra in token-strängen

---

## Om något annat strular

**"Updates were rejected because the remote contains work that you do not have locally"**

Något ändrades på GitHub som saknas lokalt. Kör:

```bash
git pull --rebase origin main
```

och sedan `git push` igen.

**Sidan visar 404**

Kontrollera att `index.html` ligger i rotmappen på GitHub och att du valt
`/ (root)`, inte `/docs`, under Pages.

**Sidan ser gammal ut**

Webbläsaren har sparat den gamla versionen. Ladda om hårt med
`Ctrl + Shift + R`.

**Sidan visar rubriken men inget innehåll**

Något filnamn i `index.html` stämmer inte med filerna i `data/`. Öppna
utvecklarkonsolen med F12 och leta efter röda 404-rader.
