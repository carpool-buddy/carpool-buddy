# carpool-buddy

## Enviromental Variables

The following enviromental variables are suggested for your machine

APP_SECRET
MONGODB_URL
PORT

## Api

### User Routes

POST /api/signup
  creates a user in the database. It requires a JSON object to be attached
  to req.body.user. The JSON object should have the fields name, email, basic,
  and carSeats(including the driver seat and should be 0 if user does
  not have a car). It should look like this:

```
req.body.user = {"name": "Bob", "email": "email@email.com", "basic": {
    "email": "email@email.com", "password": "fUzzYkIttenZ334"
  },
  "carSeats": "2"}
```

GET /api/signin

### Trip Routes

GET /api/trip
  if a req.body.userEmail is given it returns an array of trip objects that the user is 
  a part of on res.body.trips

  if there is also a req.body.tripSearch object then search results will
  be returned for the search view. The trip search object should have a
  orgin, originTime, dest, and destTime, weekDays. It should look like:

```
req.body.tripSearch = {"origin": "map coordinates", "originTime": "08:00 AM",
                       "dest": "map coordinates", "destTime": "10:00 PM",
                       "weekDays": "mon, tue, thu"}
```
  
  the return will look like:
```
res {
  body {
    trips {
      [{_id: 0, dest: there}, {_id: 1, dest: here}, {_id: 2, dest: elsewere}]
    }
  }
}
```

POST /api/trip
  creates a trip entry in the database. Needs a JSON object
  attached to req.body.trip with the trip origin, originTime, dest,
  destTime, weekDays, map, and userId. it should look like:

```
req.body.trip = {"tripName": "to work", "origin":"map coordinates", "originTime":"08:00 AM", "dest":"map coordinates",
 "weekDays":"mon, tue, thu, sat", "userId":"9H83TY3H12"}
```

DELETE /api/trip
  takes a trip id on req.body.tripId and deletes that trip object from the database