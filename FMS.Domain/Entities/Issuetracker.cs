using FMS.Domain.Entities.Auth;
using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class Issue : Entity
    {
        public virtual Vehicle Vehicle { get; set; }
        public string ProblemTitle { get; set; }
        public string ProblemDescription { get; set; }
        public virtual Site Site { get; set; }

        public virtual ApplicationUser OpenBy { get; set; }
        public string AssignedTo { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosingDate { get; set; }
        public string RelatedIssue { get; set; }
        public string ClosingComment { get; set; }
        public int? IssueCategory { get; set; }
        public byte[] Attachements { get; set; }
    }
}
