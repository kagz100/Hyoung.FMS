using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities;

/// <summary>
/// 		
/// </summary>
public partial class Issuestatus
{
    public int Id { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Issuetracker> Issuetrackers { get; set; } = new List<Issuetracker>();
}
