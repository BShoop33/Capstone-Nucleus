using System;
using System.ComponentModel.DataAnnotations;

namespace Capstone_Nucleus.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        [MaxLength(75)]
        public string VendorName { get; set; }

        [Required]
        [MaxLength(75)]
        public string ItemName { get; set; }

        [MaxLength(50)]
        public string ItemSKU { get; set; }

        [Required]
        public double UnitPrice { get; set; }

        [Required]
        public int Quantity { get; set; }

        public DateTime DateReceived { get; set; }

        public bool IsActive { get; set; }

        public Department Department { get; set; }
    }
}