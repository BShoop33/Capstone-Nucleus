using System;
using System.ComponentModel.DataAnnotations;

namespace Capstone_Nucleus.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(75)]
        public string Department { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public DateTime DateRegistered { get; set; }

        public DateTime DateDeactivated { get; set; }

        public DateTime DateLastActivated { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public bool IsActive { get; set; } 

        public UserType UserType { get; set; }
    }
}