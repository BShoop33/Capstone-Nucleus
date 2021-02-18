using System;

namespace Capstone_Nucleus.Models
{
    public class GetByPrice
    {
        public int DepartmentId { get; set; }

        public double TotalPrice { get; set; }

        public DateTime DateReceived { get; set; }
    }
}