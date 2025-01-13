export class Task {
  id: string;
  date: string;
  description: string;
  isPinned: boolean;

  constructor(id: string, date: string, description: string, isPinned: boolean) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.isPinned = isPinned;
  }
}
