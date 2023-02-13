using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    /// <summary>
    /// 	
    /// </summary>
    public partial class User
    {
        public int Id { get; set; }

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public int? UserType { get; set; }

        public string? Password { get; set; }

        public virtual ICollection<Issuetracker> IssuetrackerAssignToNavigations { get; } = new List<Issuetracker>();

        public virtual ICollection<Issuetracker> IssuetrackerOpenbyNavigations { get; } = new List<Issuetracker>();

        public virtual Usertype? UserTypeNavigation { get; set; }
    }
}
