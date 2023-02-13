using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    /// <summary>
    /// 		
    /// </summary>
    public partial class Issuetracker
    {
        public int Id { get; set; }

        public int IssueCategoryId { get; set; }

        public int SiteId { get; set; }

        public int Openby { get; set; }

        public int AssignTo { get; set; }

        public int? RelatedIssue { get; set; }

        public string ProblemDescription { get; set; } = null!;

        public string ProblemTitlte { get; set; } = null!;

        public int? Status { get; set; }

        public int? Priority { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? OpenDate { get; set; }

        public DateTime? ClosingDate { get; set; }

        public DateTime? LastModfield { get; set; }

        public string HyoungNo { get; set; } = null!;

        public virtual User AssignToNavigation { get; set; } = null!;

        public virtual Vehicle HyoungNoNavigation { get; set; } = null!;

        public virtual Issuecategory IssueCategory { get; set; } = null!;

        public virtual User OpenbyNavigation { get; set; } = null!;

        public virtual Issuepriority? PriorityNavigation { get; set; }

        public virtual Site Site { get; set; } = null!;

        public virtual Issuestatus? StatusNavigation { get; set; }
    }
}
