export class Exercise {
  id: number;
  distanceInMiles: number | undefined;
  type: string | undefined;
  description: string | undefined;
  date: string | undefined;

  constructor(id =0, distanceInMiles?: number, type?: string, description?: string, date?: string){
    this.id = id;
    this.distanceInMiles = distanceInMiles;
    this.type = type;
    this.description = description;
    this.date = date;
  }

}
