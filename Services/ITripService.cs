using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mytrips.Data.Models;

namespace Mytrips.Services
{
    public interface ITripService
    {
         List<Trip> GetAllTrips();
        Trip GetTripById(int tripId);
        void UpdateTrip(int tripId, Trip trip);
        void DeleteTrip(int tripId);
        void AddTrip(Trip trip);
    }
}