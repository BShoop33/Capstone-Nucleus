﻿using System;

namespace Capstone_Nucleus.Models
{
    public class GetByQuantity
    {
        public int DepartmentId { get; set; }

        public int TotalQuantity { get; set; }

        public DateTime DateReceived { get; set; }
    }
}