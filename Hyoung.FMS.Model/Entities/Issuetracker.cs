using Hyoung.FMS.Domain.Entities.Auth;
using Hyoung.FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Net.Mail;

namespace Hyoung.FMS.Domain.Entities
{
    public partial class Issue : Entity
    {
        public virtual Vehicle Vehicle { get; set; }
        public string ProblemTitle { get; set; }
        public string ProblemDescription { get; set; }
        public virtual Site Site { get; set; }
        public virtual ApplicationUser OpenBy { get; set; }
        public virtual ApplicationUser AssignedTo { get; set; }
        public Enum Priority { get; set; }
        public Enum Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosingDate { get; set; }
        public virtual ICollection<Issue> RelatedIssue { get; set; }
        public string ClosingComment { get; set; }
        public virtual Issuecategory IssueCategory { get; set; }
        public virtual ICollection<Attachment> Attachments { get; set; }
    }
}
