export class Question {
  [key: string]: any;
  id: number = 0;
  category: string = "";
  questionlevel: number = 0;
  question: string = "";
  img?: string = "";
  answer: string[] = []
  correctanswer!: number;
  disabled: boolean = false
}

/*{
  "id": 1,
  "category": "math",
  "questionlevel": 1,
  "question": "kérdés",
  "img": "",
  "answer": ["4520-712", "4520-712", "4520-712", "4520-712"],
  "correctanswer": 1,
  "disabled": false
},*/
