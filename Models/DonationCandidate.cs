using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_Core_Demo.Models
{
    public class DonationCandidate
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string FullName { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string MobileNumber { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Email { get; set; }
        
        public int Age { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string BloodGroup { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Address { get; set; }
    }
}