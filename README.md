# workout planner

Zadanie
STACK
React, Typescript, Tailwind CSS
❗Nie używaj bibliotek do formularzy, np. Formik.
OPIS
Wykonaj formularz z designu poniżej.

Zwróć uwagę na szczegóły i responsywność.

Każde pole jest wymagane.

Skorzystaj z API zwracającego liste świąt w Polsce.

Dokumentacja - https://api-ninjas.com/api/holidays API key = OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss
Parametr do zapytania: country=PL

W niedziele oraz dni, które mają type = "NATIONAL_HOLIDAY" nie odbywają się treningi, a więc te dni powinny być zablokowane.

Po wybraniu daty, ktora ma type = "OBSERVANCE" wyświetl informację o święcie.

Po kliknięciu “Send Application” powinna wykonać się funkcja, która wysyła dane na endpoint http://letsworkout.pl/submit z metodą post. Dane powinny być wysłane w body jako form data.
Endpoint jest zmyślony, więc nie przejmuj się, że nie działa 😉

Opcojnalnie możesz stworzyć API route, który będzie przyjmuował dane z wysłanego formularza.
👉 Żeby sobie nawzajem nie przeszkadzać, można wyłączyć kursory innych osób klikająć w % w prawym górnym rogu i tam odznaczyć “Multiplayer cursors”.
Powodzenia!


![](/home/karol/projects/workout-planner/docs/2025-03-12_16-22.png)
