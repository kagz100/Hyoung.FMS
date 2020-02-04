using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Issuetracker
    {
        public int Id { get; set; }
        public double Vehicle { get; set; }
        public string ProblemTitle { get; set; }
        public string ProblemDescription { get; set; }
        public int? Site { get; set; }
        public string OpenBy { get; set; }
        public string AssignedTo { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosingDate { get; set; }
        public string RelatedIssue { get; set; }
        public string ClosingComment { get; set; }
        public int? IssueCategory { get; set; }
        public string Attachements { get; set; }
    }
}
