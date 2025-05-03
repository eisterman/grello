## Project Plan
This is a small (probably rapidly outdated) of my project plan.

This is here to help me keep a small copy of some information directly in the project.

### Architecture

The project plan is to build an MVP with the following details:

- [ ] 4 columns
- [ ] Simple cards with minimal information
- [ ] To start: NO Real Time, User System, or multiple boards.

The finished project should have:

- [ ] Flexible Kanban boards where certain features can be enabled: Calendar (with only 2 special dates and/or 2 columns
  that trigger end) and Gantt (4 special dates — planned start, actual start, planned end, actual end — and/or 3 columns
  that trigger various transitions). Columns should be freely configurable from the Dashboard settings.
- [ ] Gantt and Calendar views showing tasks in relation to the USERS who are and will be performing those tasks. There
  will be a toggle to show or hide the user split.
- [ ] Advanced cards, in particular with Checkboxes!
- [ ] Real Time update system
- [ ] User system where multiple users can share boards with each other
- [ ] Multiple boards with one owner user and various contributor users
- [ ] Log system for dashboards and for cards

Ultra-future features:

- [ ] Dashboard with board statistics
- [ ] Table view
- [ ] Team system and advanced user permissions
- [ ] Cross-dashboard linking?

### Features

For the MVP, the columns will be:

- Backlog (not planned so no start date)
- Planned (ready to start, with date and connections already planned)
- In Progress
- Completed

Each task must have these fields (nullable and freely editable):

- Planned Start Date (or, if possible, a list of prerequisite tasks instead)
- Estimated Duration in Working Days (or alternatively, Planned End Date)
- Actual Start Date
- Actual End Date

Each column change sets certain properties:

- Backlog to Planned: To perform this action, planning data must be entered (pop-up on D&D)
- Planned to In Progress: On this action, Actual Start Date is set to Today
- In Progress to Completed: On this action, Actual End Date is set to Today

In the GANTT, task rendering should work as follows:

- Each task is drawn as a solid bar from a Start to an End date, with two additional values: AuxStart and AuxEnd, which
  allow you to display delays or time gained by overlapping planned and actual dates. How exactly to draw this will
  depend on the Gantt library used. For example, a task longer than expected may show a red area from End to AuxEnd, or
  green if finished early. If it started later than planned, there can likewise be a red zone from AuxStart to Start,
  etc.
- Task Completed appears from the actual start to the actual end, with the aux values as the planned dates.
- Task In Progress appears with Start = actual start and AuxStart = planned start. End = planned End, no AuxEnd.
- Planned Task: display with Start and End set to the planned values.
- Backlog Task appears at the end of all other already rendered tasks, with a default length from the dashboard options
  or using the Estimated Duration.
- Prerequisite connections are represented by arrows, etc.
- If a task has other tasks as its planned start date, and those are delayed, no delay will show on the next planned
  task.
- There must be a bold red line for today!
- There must be a calendar option to set typical working days during the week, and holidays/break periods for the
  dashboard.
- Holidays/vacation or skipped days must appear as greyed-out sections in the Gantt. Weekend days must be entirely
  skipped in the Gantt rendering (optional greying out may be added in the future).