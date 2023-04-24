using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

/// <summary>
/// 			
/// </summary>
public partial class Usertype
{
    public int Id { get; set; }

    public string? Type { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
