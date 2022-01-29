import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

  // ----------- 0. lépés ---------------
  // T[] jelentése, hogy olyan tömbbel dolgozik a FilterPipe class, amit még nem tudok
  // ++++++++++
  // ----------- 8. lépés ---------------
  // beállítjuk, hogy a kulcsok alapján is lehessen keresni
  // <T extends {[key: string]: any}> - így már lehetséges a kulcsokkal való indexelés
export class FilterPipe<T extends {[key: string]: any}> implements PipeTransform {

  // ----------- 1. lépés ---------------
  // T[] jelentése, hogy olyan tömbbel dolgozik, amit még nem tudok
  // így univerzálisan használható mindenféle típust tartalmazó többre
  // vagy null-t kap, mert nincs adat
  // visszatérési érték a szűrt tömb vagy a null
  // phrase a keresőkifejezés
  // ilyenkor még nincs itt a key:string = ''
  // ++++++++++
  // ----------- 9. lépés ---------------
  // a pipe-nak adunk kulcs paramétert
    transform(value: T[] | null, phrase: string, key:string = ''): T[] | null {

  // ----------- 2. lépés ---------------
  // megvizsgálja, hogy tömb-e a kapott value vagy nincs is phrase
  // visszatérési érték a value
  // array.filter() metódust akarjuk futattni, ezért fontos megvizsgálni, hogy tényleg tömb-e
  // nem csinál semmit a pipe, bejön az adat és változatlanul visszaadja
  // akkor sem szűrünk, ha a felhasználó nem adott meg keresőkifejezést, mert nincs mi alapján szűrni
    if (!Array.isArray(value) || !phrase) {
    return value;
    }

  // ----------- 3. lépés ---------------
  // kapott keresőkifejezést kisbetűssé alakítom
    phrase = phrase.toLowerCase();

  // ----------- 4. lépés ---------------
  // ha az if ágon minden stimmelt, akkor a kapott tömböt elkezdjük szűrni
  // a kapott tömb elemeiből kiveszem az értékeket és megnézem, hogy benne van-e a phrase
  // if (!key) ilyenkor még nincs
  // .join(' ') szóköz!!!, hogy az egyes elemek elkülönüljenek egymástól a keresésnél
  // ++++++++++
  // ----------- 10. lépés ---------------
  // if (!key) feltétel keresés beállítása, hogy mi van, ha nincs kulcs alapján keresés
  // ha nincs megadva a key, akkor mindenre szűrjön
    if (!key) {
    return value.filter(
      item => Object.values(item).join(' ').toLowerCase().includes(phrase)
      )
    }

  // ----------- 5. lépés ---------------
  // app.module.ts - import { FormsModule } from '@angular/forms' + imports tömbben is el kell helyezni;

  // ----------- 6. lépés ---------------
  //  product-list.component.ts-ben dolgozunk és felvesszük a phrase: string = '';

  // ----------- 7. lépés ---------------
  // a kereső input mezőben beállítjuk, hogy [(ngModel)]="phrase"
  //  amikor a felhasználó módosítja az input mezőt, akkor [(ngModel)] ezt figyeli és módosítja a phrase változót
  // a product-list.component.html-ben dolgozunk és az *ngFor-nál beállítjuk a filter-pipe-ot, mert itt van tömb, ezt tudjuk szűrni
  // első paraméter a lista (balról), második paraméter a keresőkifejezés (jobbról) => *ngFor="let product of categoryProducts | filter:phrase
  // pipe paramétereket :-tal választjuk el egymástól


  // ----------- 11. lépés ---------------
  // kulcs megadása esetén máshogyan szűrünk
  // ugyanúgy a kapott tömb elemeiből szűrünk
  // felvesszük egy külön változóba a tömb összes elemének adott kulcsú értékét
  // itt nemcsak a kapott tömb értékeiben keresem (hanem az elemek adott kulcsú értékeiben)
  // string-é + kisbetűssé alakítás fontos
  // megnézzük, hogy benne van-e a keresőkifejezés
    return value.filter( item => {
      const data = String(item[key]).toLowerCase();
      return data.includes(phrase)
    })
  }

  // ----------- 12. lépés ---------------
  // a product-list.component.ts-ben dolgozunk
  // a phrase mellé felvesszük a filterKey: string = ''

  // ----------- 13. lépés ---------------
  // a product-list.component.html-ben dolgozunk
  // beállítjuk harmadik (egy balról, kettő jobbról) paraméterként
  // *ngFor="let product of categoryProducts | filter:phrase:filterKey -ben
  // felvesszük a Product (class) model kulcsait egy változóba, hogy be tudjuk járni ngFor-ral
  // keys: string[] = Object.keys(new Product())
  //  a további szűrés csak a logikus elemekre már egyedi beállítás kérdése

  // ----------- 14. lépés ---------------
  // a product-list.component.html-ben dolgozunk
  // beállítjuk a select [(ngModel)]="filterKey"
  // option-ok beállítása
  // 1. option egy helyőrző - azt jelenti, hogy nincs kiválasztva semmi
  // 2. option a Product model kulcsai
  // *ngFor='let key of keys' [value]="key">{{ key | titlecase }}
  // Product (class) model összes kulcsát kiírjuk úgy, hogy az option value = az adott kulccsal
  // {{ key | titlecase }} között pedig az adott kulcs szerepel - titlecase pipe-val átalakítva
  // amikor a felhasználó választ, akkor az [(ngModel)] ezt figyeli és módosítja a filetKey változót
  // így a *ngFor="let product of categoryProducts | filter:phrase:filterKey a szűrt tömbbel fog csak dolgozni a for ciklus

}
