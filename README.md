# carpool-buddy

## Environmental Variables

The following environmental variables are suggested for your machine

GOOGLE_MAPS_API_KEY
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

GET /api/trips

  returns an array of trip objects that the user is 
  a part of on res.body.trips

GET /api/trips/:stringifiedSearchObject

  search results will be returned for the search view. The trip search object should have a
  orgin, originTime, dest, and destTime, weekDays. It should look like:

```
{"origin": "map coordinates", "originTime": "08:00 AM",
 "dest": "map coordinates", "destTime": "10:00 PM",
 "weekDays": "mon, tue, thu"}
```

  Make sure the object is stringified before you send it!
  
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

POST /api/trips
  creates a trip entry in the database. Needs a JSON object
  attached to req.body.trip with the trip origin, originTime, dest,
  destTime, weekDays, map. it should look like:

```
req.body.trips = {"tripName": "to work", "origin":"map coordinates", "originTime":"08:00 AM", "dest":"map coordinates",
 "destTime": "10:00 AM", "weekDays":"mon, tue, thu, sat"}
```

PUT /api/trip
  subscribes or unsubscribes a user from a trip object in the database.
  It takes a tripConfig object on req.body. tripConfig has the fields
  'remove' and 'tripId'. If remove is set to true, than the
  user is unsubscribed from the trip, otherwise the user is added to the
  trip. An example of the tripConfig object is:

```
req.body.tripConfig = {"remove": "true", "tripId": "560d88ab95136958181e421f"};
```

DELETE /api/trip
  takes a trip id on req.body.tripId and deletes that trip object from the database.
  returns 'success' on res.body.msg.