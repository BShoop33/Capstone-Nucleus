using System;

namespace Capstone_Nucleus.Models
{
    public class GetByCount
    {
        public double TotalPrice { get; set; }

        public int DepartmentId { get; set; }

        public int TotalQuantity { get; set; }

        public DateTime DateReceived { get; set; }
    }
}