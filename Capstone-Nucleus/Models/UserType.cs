using System.ComponentModel.DataAnnotations;

namespace Capstone_Nucleus.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(75)]
        public string Position { get; set; }
    }
}