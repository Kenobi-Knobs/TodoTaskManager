export class UpdateTask {
  description: string;
  isPinned: boolean;

  constructor(description: string, isPinned: boolean) {
    this.description = description;
    this.isPinned = isPinned;
  }
}