export class Task {
  id: string;
  date: string;
  description: string;

  constructor(id: string, date: string, description: string) {
    this.id = id;
    this.date = date;
    this.description = description;
  }
}
