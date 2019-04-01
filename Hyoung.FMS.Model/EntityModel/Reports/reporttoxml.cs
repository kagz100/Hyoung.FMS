using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Model.EntityModel.Reports
{

    // NOTE: Generated code may require at least .NET Framework 4.5 or .NET Core/Standard 2.0.
    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://schemas.xmlsoap.org/soap/envelope/")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "http://schemas.xmlsoap.org/soap/envelope/", IsNullable = false)]
    public partial class Envelope
    {

        private EnvelopeBody bodyField;

        /// <remarks/>
        public EnvelopeBody Body
        {
            get
            {
                return this.bodyField;
            }
            set
            {
                this.bodyField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://schemas.xmlsoap.org/soap/envelope/")]
    public partial class EnvelopeBody
    {

        private FetchReportResponse fetchReportResponseField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Namespace = "http://gpsgate.com/services/")]
        public FetchReportResponse FetchReportResponse
        {
            get
            {
                return this.fetchReportResponseField;
            }
            set
            {
                this.fetchReportResponseField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/services/")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "http://gpsgate.com/services/", IsNullable = false)]
    public partial class FetchReportResponse
    {

        private FetchReportResponseFetchReportResult fetchReportResultField;

        /// <remarks/>
        public FetchReportResponseFetchReportResult FetchReportResult
        {
            get
            {
                return this.fetchReportResultField;
            }
            set
            {
                this.fetchReportResultField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/services/")]
    public partial class FetchReportResponseFetchReportResult
    {

        private ReportOutput reportOutputField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Namespace = "http://gpsgate.com/xml/")]
        public ReportOutput ReportOutput
        {
            get
            {
                return this.reportOutputField;
            }
            set
            {
                this.reportOutputField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "http://gpsgate.com/xml/", IsNullable = false)]
    public partial class ReportOutput
    {

        private ReportOutputTables tablesField;

        /// <remarks/>
        public ReportOutputTables Tables
        {
            get
            {
                return this.tablesField;
            }
            set
            {
                this.tablesField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTables
    {

        private ReportOutputTablesTable tableField;

        /// <remarks/>
        public ReportOutputTablesTable Table
        {
            get
            {
                return this.tableField;
            }
            set
            {
                this.tableField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTable
    {

        private ReportOutputTablesTableTableDefinition tableDefinitionField;

        private ReportOutputTablesTableRow[] rowsField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinition TableDefinition
        {
            get
            {
                return this.tableDefinitionField;
            }
            set
            {
                this.tableDefinitionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Row", IsNullable = false)]
        public ReportOutputTablesTableRow[] Rows
        {
            get
            {
                return this.rowsField;
            }
            set
            {
                this.rowsField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinition
    {

        private ReportOutputTablesTableTableDefinitionPageDefinition pageDefinitionField;

        private object columnsField;

        private ReportOutputTablesTableTableDefinitionRegions regionsField;

        private bool defaultStylesField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionPageDefinition pageDefinition
        {
            get
            {
                return this.pageDefinitionField;
            }
            set
            {
                this.pageDefinitionField = value;
            }
        }

        /// <remarks/>
        public object Columns
        {
            get
            {
                return this.columnsField;
            }
            set
            {
                this.columnsField = value;
            }
        }

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegions Regions
        {
            get
            {
                return this.regionsField;
            }
            set
            {
                this.regionsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool defaultStyles
        {
            get
            {
                return this.defaultStylesField;
            }
            set
            {
                this.defaultStylesField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionPageDefinition
    {

        private string pageFormatField;

        private byte[] columnWidthsField;

        /// <remarks/>
        public string pageFormat
        {
            get
            {
                return this.pageFormatField;
            }
            set
            {
                this.pageFormatField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayAttribute()]
        [System.Xml.Serialization.XmlArrayItemAttribute("double", IsNullable = false)]
        public byte[] columnWidths
        {
            get
            {
                return this.columnWidthsField;
            }
            set
            {
                this.columnWidthsField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegions
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegion regionField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegion Region
        {
            get
            {
                return this.regionField;
            }
            set
            {
                this.regionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegion
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionHeader headerField;

        private ReportOutputTablesTableTableDefinitionRegionsRegionItem itemField;

        private ReportOutputTablesTableTableDefinitionRegionsRegionFooter footerField;

        private bool repeatHeaderField;

        private bool pageBreakField;

        private string expressionField;

        private byte levelField;

        private string sortExpressionField;

        private string sortDirectionField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionHeader Header
        {
            get
            {
                return this.headerField;
            }
            set
            {
                this.headerField = value;
            }
        }

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionItem Item
        {
            get
            {
                return this.itemField;
            }
            set
            {
                this.itemField = value;
            }
        }

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionFooter Footer
        {
            get
            {
                return this.footerField;
            }
            set
            {
                this.footerField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool repeatHeader
        {
            get
            {
                return this.repeatHeaderField;
            }
            set
            {
                this.repeatHeaderField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool pageBreak
        {
            get
            {
                return this.pageBreakField;
            }
            set
            {
                this.pageBreakField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte level
        {
            get
            {
                return this.levelField;
            }
            set
            {
                this.levelField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string sortExpression
        {
            get
            {
                return this.sortExpressionField;
            }
            set
            {
                this.sortExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string sortDirection
        {
            get
            {
                return this.sortDirectionField;
            }
            set
            {
                this.sortDirectionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionHeader
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRow regionRowField;

        private string kindField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRow RegionRow
        {
            get
            {
                return this.regionRowField;
            }
            set
            {
                this.regionRowField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string kind
        {
            get
            {
                return this.kindField;
            }
            set
            {
                this.kindField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRow
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumn[] columnField;

        private string idField;

        private bool visibilityExpressionField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Column")]
        public ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumn[] Column
        {
            get
            {
                return this.columnField;
            }
            set
            {
                this.columnField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool VisibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumn
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumnLayout layoutField;

        private ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumnAltLayout altLayoutField;

        private string expressionField;

        private string visibilityExpressionField;

        private string actionField;

        private string idField;

        private byte cspanField;

        private string unitField;

        private bool escapeField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumnLayout Layout
        {
            get
            {
                return this.layoutField;
            }
            set
            {
                this.layoutField = value;
            }
        }

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumnAltLayout AltLayout
        {
            get
            {
                return this.altLayoutField;
            }
            set
            {
                this.altLayoutField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string visibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string action
        {
            get
            {
                return this.actionField;
            }
            set
            {
                this.actionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte cspan
        {
            get
            {
                return this.cspanField;
            }
            set
            {
                this.cspanField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string unit
        {
            get
            {
                return this.unitField;
            }
            set
            {
                this.unitField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool escape
        {
            get
            {
                return this.escapeField;
            }
            set
            {
                this.escapeField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumnLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionHeaderRegionRowColumnAltLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionItem
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRow regionRowField;

        private string kindField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRow RegionRow
        {
            get
            {
                return this.regionRowField;
            }
            set
            {
                this.regionRowField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string kind
        {
            get
            {
                return this.kindField;
            }
            set
            {
                this.kindField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRow
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumn[] columnField;

        private string idField;

        private bool visibilityExpressionField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Column")]
        public ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumn[] Column
        {
            get
            {
                return this.columnField;
            }
            set
            {
                this.columnField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool VisibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumn
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumnLayout layoutField;

        private ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumnAltLayout altLayoutField;

        private string expressionField;

        private string visibilityExpressionField;

        private string actionField;

        private string idField;

        private byte cspanField;

        private string unitField;

        private bool escapeField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumnLayout Layout
        {
            get
            {
                return this.layoutField;
            }
            set
            {
                this.layoutField = value;
            }
        }

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumnAltLayout AltLayout
        {
            get
            {
                return this.altLayoutField;
            }
            set
            {
                this.altLayoutField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string visibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string action
        {
            get
            {
                return this.actionField;
            }
            set
            {
                this.actionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte cspan
        {
            get
            {
                return this.cspanField;
            }
            set
            {
                this.cspanField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string unit
        {
            get
            {
                return this.unitField;
            }
            set
            {
                this.unitField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool escape
        {
            get
            {
                return this.escapeField;
            }
            set
            {
                this.escapeField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumnLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionItemRegionRowColumnAltLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionFooter
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRow regionRowField;

        private string kindField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRow RegionRow
        {
            get
            {
                return this.regionRowField;
            }
            set
            {
                this.regionRowField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string kind
        {
            get
            {
                return this.kindField;
            }
            set
            {
                this.kindField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRow
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumn[] columnField;

        private string idField;

        private bool visibilityExpressionField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Column")]
        public ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumn[] Column
        {
            get
            {
                return this.columnField;
            }
            set
            {
                this.columnField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool VisibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumn
    {

        private ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumnLayout layoutField;

        private ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumnAltLayout altLayoutField;

        private string expressionField;

        private string visibilityExpressionField;

        private string actionField;

        private string idField;

        private byte cspanField;

        private bool escapeField;

        private string unitField;

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumnLayout Layout
        {
            get
            {
                return this.layoutField;
            }
            set
            {
                this.layoutField = value;
            }
        }

        /// <remarks/>
        public ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumnAltLayout AltLayout
        {
            get
            {
                return this.altLayoutField;
            }
            set
            {
                this.altLayoutField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string visibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string action
        {
            get
            {
                return this.actionField;
            }
            set
            {
                this.actionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte cspan
        {
            get
            {
                return this.cspanField;
            }
            set
            {
                this.cspanField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool escape
        {
            get
            {
                return this.escapeField;
            }
            set
            {
                this.escapeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string unit
        {
            get
            {
                return this.unitField;
            }
            set
            {
                this.unitField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumnLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableTableDefinitionRegionsRegionFooterRegionRowColumnAltLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableRow
    {

        private ReportOutputTablesTableRowCell[] cellField;

        private string refField;

        private byte inxField;

        private string kindField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Cell")]
        public ReportOutputTablesTableRowCell[] Cell
        {
            get
            {
                return this.cellField;
            }
            set
            {
                this.cellField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string @ref
        {
            get
            {
                return this.refField;
            }
            set
            {
                this.refField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte inx
        {
            get
            {
                return this.inxField;
            }
            set
            {
                this.inxField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string kind
        {
            get
            {
                return this.kindField;
            }
            set
            {
                this.kindField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class ReportOutputTablesTableRowCell
    {

        private string refField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string @ref
        {
            get
            {
                return this.refField;
            }
            set
            {
                this.refField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }


}
