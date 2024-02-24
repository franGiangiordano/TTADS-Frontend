import { Equipment } from 'projects/crud-equipment/src/lib/models';

export class Travel {
  constructor(
    _id = '',
    departure_date = new Date(),
    arrival_date = new Date(),
    cost = 0,
    km = 0,
    starting_location = '',
    final_location = '',
    equipment: Equipment,
    destination_description = ''
  ) {
    this._id = _id;
    this.departure_date = departure_date;
    this.arrival_date = arrival_date;
    this.cost = cost;
    this.km = km;
    this.starting_location = starting_location;
    this.final_location = final_location;
    this.equipment = equipment;
    this.destination_description = destination_description;
  }
  _id: string;
  departure_date: Date;
  arrival_date: Date;
  cost: number;
  km: number;
  starting_location: string;
  final_location: string;
  equipment: Equipment;
  destination_description: string;
}
