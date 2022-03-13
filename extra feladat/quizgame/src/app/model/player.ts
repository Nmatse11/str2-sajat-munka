import { Category } from "./category";

export class Player {
  [key: string]: any;
  id: number = 1;
  name: string = "";
  random: boolean = false;
  gamelevel: number = 1;
  start_score: number = 0;
  end_score: number = 0;
  allOfRound: number = 10;
  round: number = 0;
  cat1: Category = new Category()
  cat2: Category = new Category()
  cat3: Category = new Category()
  cat4: Category = new Category()
  cat5: Category = new Category()
  cat6: Category = new Category()
  category: string = "";
  hunCategory: string = "";
  questionlevel: number = 0;
  bet: number = 0;
  win: Boolean[] = [false, false, false, false, false];
  score: number[] = [];
}

  /*KEZDŐ BEÁLLÍTÁS
  {
    "id": 1,
    "random": false,
    "gamelevel": 1,
    "allOfRound": 10
  }
  */

