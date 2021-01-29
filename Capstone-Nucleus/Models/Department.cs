using System.ComponentModel.DataAnnotations;

namespace Capstone_Nucleus.Models
{
    public class Department
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(75)]
        public string Name { get; set; }
    }
}