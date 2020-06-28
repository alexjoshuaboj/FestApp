import { Component, OnInit } from '@angular/core';
import { FestService } from '../fest.service';
import * as jwt_decode from "jwt-decode";
import differenceInCalendarISOYears from 'date-fns/differenceInCalendarISOWeekYears';

// angular calendar

import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idUser: string;
  bandsHours: any;

  constructor(
    private festservice: FestService,
    private modal: NgbModal
  ) {
    this.idUser = "";
  }

  async ngOnInit() {
    const resultToken = await localStorage.getItem('token_user');
    this.idUser = await this.getDecodedAccessToken(resultToken).userID;
    const resultFests: any = await this.festservice.getUserFestival(parseInt(this.idUser));
    //si no te los pinta avisa que a mi a veces no me los pinta y no entiendo porque 
    for (let i of resultFests) {
      const result: any = await this.festservice.getHoursBands(this.idUser, i.id);
      /*       const fests = result.map((resultband) => {
              {
                resultband.inicio,
                  resultband.fin,
                  resultband.nombre
              }
            }) */

      for (let j of result) {
<<<<<<< HEAD
        this.bandsHours =
        {
          end: new Date(j.fin),
          start: new Date(j.inicio),
          title: j.nombre
        }

        return this.bandsHours;
=======


        this.addEvent(j.nombre, parseISO(j.inicio), parseISO(j.fin));

        //Llamo a la función AddEvent metiendole los parametros más basicos, lo suyo sería que cambiase de color, eso ya es movida tuya.
>>>>>>> 0244f024480683853c48ddd01644c119e515b793
      }

    }
  }

  //events no existía :)
  events: CalendarEvent[] = [

  ];


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  };
  //angular calendar functions 

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();


  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

<<<<<<< HEAD
  addEventp() {
=======
  addEvent(eventNombre, eventStart, eventEnd): void {
    //Aqui le ge cambiado los parametros que traia predefinidos, y le he metido unos propios (aqui se puede cambiar el color y meterselo por parametro si quieres)
>>>>>>> 0244f024480683853c48ddd01644c119e515b793
    this.events = [
      ...this.events,
      {
        title: eventNombre,
        start: startOfDay(eventStart),
        end: endOfDay(eventEnd),
        color: colors.red,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    console.log(eventNombre)
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

