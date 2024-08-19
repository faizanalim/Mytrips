using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mytrips.Data.Models;
using System.Collections.Generic;
using System.Linq;



namespace Mytrips.Services
{
    public class TripService : ITripService
    {
        public void AddTrip(Trip trip)
        {
             Data.Data.Trips.Add(trip);
        }

        public void DeleteTrip(int tripId)
        {
            var trip = Data.Data.Trips.FirstOrDefault(n => n.Id == tripId);
            if(trip != null)
            {
                Data.Data.Trips.Remove(trip);
            }
        }

        public List<Trip> GetAllTrips() => Data.Data.Trips.ToList();
        

        public Trip GetTripById(int tripId) => Data.Data.Trips.FirstOrDefault(n => n.Id == tripId);
       

        public void UpdateTrip(int tripId, Trip trip)
        {
           var oldTrip = Data.Data.Trips.FirstOrDefault(n => n.Id == tripId);

            if(oldTrip != null)
            {
                oldTrip.Name = trip.Name;
                oldTrip.Description = trip.Description;
                oldTrip.DateStarted = trip.DateStarted;
                oldTrip.DateCompleted = trip.DateCompleted;
            }
        }
    }
}